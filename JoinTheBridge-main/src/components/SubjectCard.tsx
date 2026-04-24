interface SubjectCardProps {
    title: string;
    description: string;
    icon: string; // SVG path
    color: string; // Tailwind bg color class for the icon container
}

const SUBJECTS: SubjectCardProps[] = [
    {
        title: "Mathematics",
        description:
            "From arithmetic fundamentals to algebra — building the quantitative reasoning skills that unlock career opportunities.",
        icon: "M4 4h16v16H4zM9 9h6M9 12h4M9 15h6",
        color: "bg-blue-600",
    },
    {
        title: "Science",
        description:
            "Hands-on experiments and critical thinking exercises that make science accessible and exciting for every learner.",
        icon: "M9 3v2M15 3v2M12 3v2M6 8h12M6 8a3 3 0 00-3 3v1a3 3 0 003 3h2l1 4h6l1-4h2a3 3 0 003-3v-1a3 3 0 00-3-3",
        color: "bg-purple-600",
    },
    {
        title: "Literacy",
        description:
            "Reading comprehension, writing skills, and communication — the foundation for success in every subject and career path.",
        icon: "M4 19.5A2.5 2.5 0 016.5 17H20M4 19.5V4.5A2.5 2.5 0 016.5 2H20v17H6.5A2.5 2.5 0 004 19.5z",
        color: "bg-amber-600",
    },
    {
        title: "Economics",
        description:
            "Budgeting, credit, savings, and financial planning — practical money management skills that break the cycle of poverty.",
        icon: "M12 1v22M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6",
        color: "bg-brand-forest",
    },
];

function SubjectCard({ title, description, icon, color }: SubjectCardProps) {
    return (
        <div className="card-hover p-6">
            <div className={`w-12 h-12 rounded-lg ${color} flex items-center justify-center mb-4`}>
                <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth={1.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d={icon} />
                </svg>
            </div>
            <h3 className="text-lg font-bold text-brand-navy mb-2">{title}</h3>
            <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
        </div>
    );
}

export default function SubjectCards() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SUBJECTS.map((subject) => (
                <SubjectCard key={subject.title} {...subject} />
            ))}
        </div>
    );
}

export { SUBJECTS };
