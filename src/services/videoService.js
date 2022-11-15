import { createClient } from "@supabase/supabase-js";

const PROJECT_URL = "https://ukslhidycmfpmywlwwha.supabase.co";
const PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVrc2xoaWR5Y21mcG15d2x3d2hhIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Njg0NzE1MDQsImV4cCI6MTk4NDA0NzUwNH0.BOTkJfG3feu7VQdSjaQ7n_oJa9fddNXGCyERVSU9Eww";
const supabase = createClient(PROJECT_URL, PUBLIC_KEY);

export function videoService() {
    return {
        getAllVideos() {
            return supabase.from("video")
                .select("*");
        }
    }
}