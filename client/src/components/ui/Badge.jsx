function Badge({
    children,
    variant = "featured",
    className = "",
}) {
    const variants = {
        featured: "bg-[#0B4F3A] text-white",

        bestseller: "bg-[#E6C77A] text-[#1F2925]",

        offer: "bg-[#C8922E] text-white",

        limited: "bg-[#B64A4A] text-white",

        success: "bg-[#2F7D5A] text-white",

        neutral: "bg-[#F2F5F1] text-[#66736D]",
    };

    return (
        <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${variants[variant] ?? variants.neutral} ${className}`}>
            {children}
        </span>
    );
}
export default Badge;
