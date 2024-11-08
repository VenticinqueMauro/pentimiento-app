import { Mail, MapPin, Phone } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function Component() {
    return (
        <div className="bg-background p-4 md:p-8 lg:p-12">
            <Card className="mx-auto max-w-2xl">
                <CardHeader>
                    <CardTitle className="text-center text-3xl font-bold tracking-tight">CONTACTO</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-6">
                    <Link
                        href="https://maps.google.com/?q=Bonpland+2363+of.401,+CABA,+Argentina"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-start gap-4 rounded-lg border p-4 transition-all hover:bg-muted/50 hover:shadow-md"
                    >
                        <MapPin className="mt-1 h-5 w-5 shrink-0 text-muted-foreground transition-colors group-hover:text-[#00AEEF]" />
                        <span>
                            <h3 className="font-semibold leading-none tracking-tight group-hover:text-[#00AEEF]">Dirección</h3>
                            <p className="mt-2 text-sm text-muted-foreground">Bonpland 2363 of.401, CABA, Argentina</p>
                        </span>
                    </Link>

                    <Link
                        href="mailto:info@pentimento.cc"
                        className="group flex items-start gap-4 rounded-lg border p-4 transition-all hover:bg-muted/50 hover:shadow-md"
                    >
                        <Mail className="mt-1 h-5 w-5 shrink-0 text-muted-foreground transition-colors group-hover:text-[#00AEEF]" />
                        <span>
                            <h3 className="font-semibold leading-none tracking-tight group-hover:text-[#00AEEF]">Email General</h3>
                            <p className="mt-2 text-sm text-muted-foreground group-hover:text-primary group-hover:underline">info@pentimento.cc</p>
                        </span>
                    </Link>

                    <div className="grid gap-4 md:grid-cols-2">
                        <Link
                            href="https://wa.me/541162662804"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-start gap-4 rounded-lg border p-4 transition-all hover:bg-muted/50 hover:shadow-md"
                        >
                            <Phone className="mt-1 h-5 w-5 shrink-0 text-muted-foreground transition-colors group-hover:text-[#00AEEF]" />
                            <span>
                                <h3 className="font-semibold leading-none tracking-tight group-hover:text-[#00AEEF]">Pablo Cruz</h3>
                                <p className="mt-2 text-sm text-muted-foreground group-hover:text-primary group-hover:underline">+54-1162662804</p>
                                <p className="mt-1 text-sm text-muted-foreground hover:underline group-hover:text-primary"
                                >
                                    pablo@pentimento.cc
                                </p>
                            </span>
                        </Link>

                        <Link
                            href="https://wa.me/541161818373"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-start gap-4 rounded-lg border p-4 transition-all hover:bg-muted/50 hover:shadow-md"
                        >
                            <Phone className="mt-1 h-5 w-5 shrink-0 text-muted-foreground transition-colors group-hover:text-[#00AEEF]" />
                            <span>
                                <h3 className="font-semibold leading-none tracking-tight group-hover:text-[#00AEEF]">Agustina Russo</h3>
                                <p className="mt-2 text-sm text-muted-foreground group-hover:text-primary group-hover:underline">+54-1161818373</p>
                                <p className="mt-1 text-sm text-muted-foreground hover:underline group-hover:text-primary"
                                >
                                    agustina@pentimento.cc
                                </p>
                            </span>
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}