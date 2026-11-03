import Link from "next/link";
export default function NotFound() { return <div className="not-found"><span className="eyebrow">A LITTLE DETOUR</span><h1>Oops, this page <em>unravelled.</em></h1><p>We couldn't find what you're looking for. Let's get you back to the good stuff.</p><Link href="/" className="button button-dark">Back to home</Link></div>; }
