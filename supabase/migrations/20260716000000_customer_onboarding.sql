-- Create profiles table
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    email TEXT NOT NULL,
    full_name TEXT,
    phone_number TEXT,
    state TEXT,
    lga TEXT,
    residential_address TEXT,
    customer_type TEXT CHECK (customer_type IN ('residential', 'sme', 'commercial')),
    onboarding_step INTEGER DEFAULT 1,
    onboarding_completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create properties table
CREATE TABLE IF NOT EXISTS public.properties (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE UNIQUE NOT NULL,
    ownership TEXT CHECK (ownership IN ('owner', 'tenant', 'other')),
    building_type TEXT CHECK (building_type IN ('bungalow', 'duplex', 'flat', 'office', 'other')),
    number_of_floors INTEGER DEFAULT 1,
    roof_type TEXT CHECK (roof_type IN ('concrete', 'metal_sheet', 'shingle', 'tile', 'other')),
    roof_condition TEXT CHECK (roof_condition IN ('excellent', 'good', 'fair', 'needs_repair')),
    roof_accessibility TEXT CHECK (roof_accessibility IN ('easy', 'difficult', 'no_access')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create electricity_profiles table
CREATE TABLE IF NOT EXISTS public.electricity_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE UNIQUE NOT NULL,
    current_source TEXT,
    phcn_availability INTEGER DEFAULT 0,
    generator_ownership BOOLEAN DEFAULT FALSE,
    monthly_fuel_cost NUMERIC DEFAULT 0,
    average_electricity_bill NUMERIC DEFAULT 0,
    has_existing_inverter BOOLEAN DEFAULT FALSE,
    has_existing_solar BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.electricity_profiles ENABLE ROW LEVEL SECURITY;

-- Enable public access policies
-- PROFILES Policies
CREATE POLICY "Users can select own profile" ON public.profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

-- PROPERTIES Policies
CREATE POLICY "Users can select own property" ON public.properties
    FOR SELECT USING (auth.uid() = profile_id);

CREATE POLICY "Users can insert own property" ON public.properties
    FOR INSERT WITH CHECK (auth.uid() = profile_id);

CREATE POLICY "Users can update own property" ON public.properties
    FOR UPDATE USING (auth.uid() = profile_id);

-- ELECTRICITY_PROFILES Policies
CREATE POLICY "Users can select own electricity_profile" ON public.electricity_profiles
    FOR SELECT USING (auth.uid() = profile_id);

CREATE POLICY "Users can insert own electricity_profile" ON public.electricity_profiles
    FOR INSERT WITH CHECK (auth.uid() = profile_id);

CREATE POLICY "Users can update own electricity_profile" ON public.electricity_profiles
    FOR UPDATE USING (auth.uid() = profile_id);

-- Database Trigger function to automatically create profile record when a user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, email, full_name, customer_type)
    VALUES (
        new.id,
        new.email,
        COALESCE(new.raw_user_meta_data->>'full_name', ''),
        COALESCE(new.raw_user_meta_data->>'role', 'customer')
    );
    RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create the trigger
CREATE OR REPLACE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
