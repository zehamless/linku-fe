'use client'
import { Link2, Loader2, Link as LucideLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useFormState, useFormStatus } from "react-dom";
import { memo, useState } from "react";
import Link from "next/link";

// Separate Submit component with memo to prevent unnecessary re-renders
const Submit = memo(function Submit({ pending }: { pending: boolean }) {
    return (
        <Button type="submit" variant="neutral" className="gap-2" disabled={pending}>
            {pending ? <Loader2 className="w-6 h-6 animate-spin"/> : <Link2 className="w-6 h-6"/>}
            Shorten
        </Button>
    );
});

// Constants
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://localhost/api/v1/linku';
const base_url = process.env.NEXT_PUBLIC_BASE_URL || 'https://localhost';
export default function Home() {
    const [shortenedUrls, setShortenedUrls] = useState<Array<{ original: string, shortened: string }>>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const handleSubmit = async (formData: FormData) => {
        setLoading(true);
        try {
            const url = formData.get('url') as string;
            const shorten = formData.get('shorten') as string;

            if (!url) {
                setError('URL is required');
                setLoading(false);
                return;
            }

            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                mode: 'cors', // Explicitly state that this is a CORS request
                body: JSON.stringify({ url, shorten }),
            });
            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'An error occurred');
            }
            const data = await response.json();
            console.log('Data:', data);
            setShortenedUrls(prev => [...prev, { original: url, shortened: data.data.shortCode }]);
            setError(null);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
            console.error('Error:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-bg space-y-12">
            <div className="max-w-3xl mx-auto space-y-12 pt-10">
                <div className="space-y-4 flex justify-center items-center">
                    <Button variant="reverse" className="w-fit h-fit p-4">
                        <LucideLink className="w-12 h-12"/>
                    </Button>
                </div>
                <div className="flex flex-col items-center">
                    <h1 className="text-5xl font-bold text-text">URL Shortener</h1>
                    <p className="text-xl text-text">Make your long URLs short and sweet!</p>
                </div>
            </div>
            <div className="max-w-3xl mx-auto space-y-12">
                <Card>
                    <CardContent>
                        <form onSubmit={(e) => { e.preventDefault(); handleSubmit(new FormData(e.currentTarget)); }} className="flex flex-col mt-5 gap-2">
                            <div className="flex w-full gap-2">
                                <Input
                                    type="url"
                                    name="url"
                                    placeholder="URL"
                                    required
                                    aria-label="URL to shorten"
                                />
                                <Input
                                    type="text"
                                    name="shorten"
                                    required
                                    placeholder="Custom Alias (optional)"
                                    aria-label="Custom alias"
                                />
                                <Submit pending={loading} />
                            </div>
                            {error && <p className="text-red-500 text-sm">{error}</p>}
                        </form>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <h3 className="text-xl font-bold text-text">Shortened URLs</h3>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col gap-2">
                            {shortenedUrls.map((item, index) => (
                                <div key={index} className="flex justify-between items-center">
                                    <Link href={`${API_URL}/${item.shortened}`} className="text-tx text-lg underline w-full flex justify-between" target="_blank" rel="noreferrer">
                                        <span className="truncate">{base_url+'/'+item.shortened}</span>
                                        <Link2 className="w-6 h-6"/>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </main>
    );
}