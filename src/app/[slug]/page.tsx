// app/[id]/page.js
import {Loader2} from "lucide-react";
import {redirect} from "next/navigation";

export default async function Page({ params }) {
    const id = (await params).slug;
    // console.log('ID:', id);
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://127.0.0.1/api/v1/linku';

        const response = await fetch(`${API_URL}/${id}`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            mode: 'cors',
        });
        const data =await response.json();
        redirect(data.data.url);

    return (
<div className="w-screen h-screen flex items-center justify-center">
    <Loader2 className="w-6 h-6 animate-spin"/>
</div>
    );
}
