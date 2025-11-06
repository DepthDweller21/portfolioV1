import Link from "next/link";

export default function Nav() {
    return (
        <div className="flex justify-between items-center p-4">
            <h2>Muhammad Haris</h2>
            <div className="flex gap-4">
                <Link href="/">Home</Link>
                <Link href="/sample">Sample</Link>
            </div>
        </div>
    );
}