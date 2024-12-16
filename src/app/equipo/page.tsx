import Image from 'next/image'
import Link from 'next/link'

interface TeamMember {
    name: string
    role: string
    description: string
    imageUrl: string
    url: string
}

const teamMembers: TeamMember[] = [
    {
        name: "Jorge Russo",
        role: "Colorista senior",
        description: "Fundador de Pentimento",
        imageUrl: "/avatar/jorge.png",
        url: "/equipo/jorge"
    },
    {
        name: "Pablo Cruz",
        role: "Productor",
        description: "Fundador de Pentimento",
        imageUrl: "/avatar/pablo.png",
        url: "/equipo/pablo"
    },
    {
        name: "Rodrigo Silvestri",
        role: "Colorista senior",
        description: "Supervisor técnico",
        imageUrl: "/avatar/rodri.png",
        url: "/equipo/rodrigo"
    },
    {
        name: "Agustina Russo",
        role: "Coordinadora",
        description: "Colorista asistente",
        imageUrl: "/avatar/115x115-Agus.jpg",
        url: "/equipo/agustina"
    },
    {
        name: "Lu Larrea",
        role: "Colorista freelance",
        description: "",
        imageUrl: "/avatar/115x115-Lu.jpg",
        url: "/equipo/lu"
    },
    {
        name: "Laura Larrossa",
        role: "Colorista freelance",
        description: "",
        imageUrl: "/avatar/115x115-Laura.jpg",
        url: "/equipo/laura"
    }
]

export default function PentimentoTeam() {
    return (
        <div className="bg-gray-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12 max-w-5xl mx-auto">
                    <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                        Pentimento Color Grading
                    </h1>
                    <p className="mt-10 text-xl text-gray-500 text-start">
                        Con el paso del tiempo la pintura al óleo puede transparentarse y revelar los &quot;pentimentos&quot; del artista, aquellos aspectos o ideas de su trabajo que fue modificando mediante sucesivas capas de colores, formas y texturas conforme avanzaba en su realización.
                    </p>
                    <div className='bg-white overflow-hidden shadow-lg rounded-lg p-10 mt-12 max-w-4xl mx-auto'>
                        <blockquote className="text-xl italic text-gray-600 ">
                            “Citando a Lilian Hellman en sus memorias, se me ocurrió hace una década el nombre Pentimento, al pensarlo me di cuenta que nuestra labor de coloristas en la intervención de la imágen fotográfica tenía semejanza al proceso que aplican los pintores y restauradores desde hace siglos.“
                        </blockquote>
                        <p className="mt-2 text-lg font-semibold text-gray-700">- Jorge Russo</p>
                    </div>
                </div>

                <div className="mt-12 text-start max-w-5xl mx-auto">
                    <p className="text-xl text-gray-500 mb-8">
                        En octubre del 2013 Jorge Russo después de una destacada trayectoria en el medio y con la idea de tener su estudio propio, creó Pentimento Color Grading, una boutique de color ubicada en el barrio de Palermo dedicada a la corrección de color digital para producciones nacionales e internacionales, en cortos comerciales, largometrajes, series y publicidad.
                    </p>
                </div>

                <div className="mt-12">
                    <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Nuestro Equipo</h2>
                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {teamMembers.map((member, index) => (
                            <Link key={index} href={member.url} className="bg-white overflow-hidden shadow-lg rounded-lg">
                                <div className="p-5">
                                    <div className="flex items-center justify-center">
                                        <Image
                                            className="h-32 w-32 rounded-full object-contain"
                                            src={member.imageUrl}
                                            alt={`${member.name}'s profile picture`}
                                            width={128}
                                            height={128}
                                        />
                                    </div>
                                    <div className="mt-4 text-center">
                                        <h3 className="text-lg font-medium text-gray-900">{member.name}</h3>
                                        <p className="text-sm font-medium text-indigo-600">{member.role}</p>
                                        <p className="text-sm text-gray-500">{member.description}</p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

