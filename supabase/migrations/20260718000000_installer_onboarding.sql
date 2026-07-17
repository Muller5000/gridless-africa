-- Create installer_profiles table
CREATE TABLE IF NOT EXISTS public.installer_profiles (
    id UUID PRIMARY KEY REFERENCES public.profiles(id) ON DELETE CASCADE,
    company_name TEXT NOT NULL,
    cac_registration BOOLEAN DEFAULT FALSE NOT NULL,
    rc_number TEXT,
    operating_states TEXT[] NOT NULL,
    operating_lgas TEXT[] DEFAULT '{}'::TEXT[] NOT NULL,
    years_of_experience INTEGER NOT NULL,
    specializations TEXT[] NOT NULL,
    technicians_count INTEGER DEFAULT 0 NOT NULL,
    engineers_count INTEGER DEFAULT 0 NOT NULL,
    support_staff_count INTEGER DEFAULT 0 NOT NULL,
    verification_status TEXT CHECK (verification_status IN ('pending', 'under_review', 'approved', 'rejected')) DEFAULT 'pending' NOT NULL,
    onboarding_step INTEGER DEFAULT 1 NOT NULL,
    onboarding_completed BOOLEAN DEFAULT FALSE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create installer_certifications table
CREATE TABLE IF NOT EXISTS public.installer_certifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    installer_id UUID REFERENCES public.installer_profiles(id) ON DELETE CASCADE NOT NULL,
    name TEXT NOT NULL,
    license_number TEXT,
    document_url TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create installer_portfolios table
CREATE TABLE IF NOT EXISTS public.installer_portfolios (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    installer_id UUID REFERENCES public.installer_profiles(id) ON DELETE CASCADE NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    system_size_kva NUMERIC NOT NULL,
    image_urls TEXT[] NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable Row-Level Security on all tables
ALTER TABLE public.installer_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.installer_certifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.installer_portfolios ENABLE ROW LEVEL SECURITY;

-- -------------------------------------------------------------
-- RLS Policies
-- -------------------------------------------------------------

-- installer_profiles Policies
CREATE POLICY "Authenticated users can select installer profiles" ON public.installer_profiles
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Installers can insert own profile" ON public.installer_profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Installers can update own profile" ON public.installer_profiles
    FOR UPDATE USING (auth.uid() = id);

-- installer_certifications Policies
CREATE POLICY "Authenticated users can select installer certifications" ON public.installer_certifications
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Installers can insert own certifications" ON public.installer_certifications
    FOR INSERT WITH CHECK (auth.uid() = installer_id);

CREATE POLICY "Installers can delete own certifications" ON public.installer_certifications
    FOR DELETE USING (auth.uid() = installer_id);

-- installer_portfolios Policies
CREATE POLICY "Authenticated users can select installer portfolios" ON public.installer_portfolios
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Installers can insert own portfolios" ON public.installer_portfolios
    FOR INSERT WITH CHECK (auth.uid() = installer_id);

CREATE POLICY "Installers can update own portfolios" ON public.installer_portfolios
    FOR UPDATE USING (auth.uid() = installer_id);

CREATE POLICY "Installers can delete own portfolios" ON public.installer_portfolios
    FOR DELETE USING (auth.uid() = installer_id);

-- -------------------------------------------------------------
-- Storage Bucket & Storage Policies
-- -------------------------------------------------------------

-- Create storage bucket for installer uploads if storage schema is available
INSERT INTO storage.buckets (id, name, public)
VALUES ('installers', 'installers', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for installers bucket
CREATE POLICY "Public Access to Installer Files" ON storage.objects
    FOR SELECT USING (bucket_id = 'installers');

CREATE POLICY "Installers can upload their own files" ON storage.objects
    FOR INSERT WITH CHECK (
        bucket_id = 'installers' AND
        (storage.foldername(name))[1] = auth.uid()::text
    );

CREATE POLICY "Installers can delete their own files" ON storage.objects
    FOR DELETE USING (
        bucket_id = 'installers' AND
        (storage.foldername(name))[1] = auth.uid()::text
    );
