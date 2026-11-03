"use client";
import { MessageCircle } from "lucide-react";
import { whatsappLink } from "@/lib/whatsapp";
export default function WhatsAppLink({ message, label = "Chat on WhatsApp", className = "" }: { message: string; label?: string; className?: string }) {
  return <a className={className} href={whatsappLink(message)} target="_blank" rel="noopener noreferrer"><MessageCircle size={17} />{label}</a>;
}