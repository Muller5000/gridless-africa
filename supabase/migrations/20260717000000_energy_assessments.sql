-- Create assessments table
CREATE TABLE IF NOT EXISTS public.assessments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE UNIQUE NOT NULL,
    appliances JSONB NOT NULL,
    daily_wh NUMERIC NOT NULL,
    daily_kwh NUMERIC NOT NULL,
    peak_load_w NUMERIC NOT NULL,
    recommended_inverter_kva NUMERIC NOT NULL,
    recommended_battery_kwh NUMERIC NOT NULL,
    recommended_solar_w NUMERIC NOT NULL,
    category TEXT CHECK (category IN ('small', 'medium', 'large', 'commercial')) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable RLS on assessments table
ALTER TABLE public.assessments ENABLE ROW LEVEL SECURITY;

-- Create policies for assessments
CREATE POLICY "Users can select own assessment" ON public.assessments
    FOR SELECT USING (auth.uid() = profile_id);

CREATE POLICY "Users can insert own assessment" ON public.assessments
    FOR INSERT WITH CHECK (auth.uid() = profile_id);

CREATE POLICY "Users can update own assessment" ON public.assessments
    FOR UPDATE USING (auth.uid() = profile_id);
