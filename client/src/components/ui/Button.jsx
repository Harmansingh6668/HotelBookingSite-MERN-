function Button({ 
    children,
    variant = "primary",
    type = "button",
    onClick,
    disabled = false,
    className = "",
}) {
    const baseStyle = "inline-flex items-center rounded-[10px] px-5 py-2.5 text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#0B4F3A]/10 disabled:cursor-not-allowed disabled:opacity-50";

    const variants = {
        primary : "bg-[#0B4F3A] hover:bg-[#083D2D] text-white",

        secondary : "border border-[#0B4F3A] bg-transparent text-[#0B4F3A] hover:bg-[#0B4F3A] hover:text-white",

        gold : "bg-[#C8922E] text-white hover:bg-[#a97825]",

        danger: "bg-[#B64A4A] text-white hover:bg-[#963c3c]",

        ghost: "bg-transparent text-[#0B4F3A] hover:bg-[#F2F5F1]",
    
    };

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`${baseStyle} ${variants[variant] ?? variants.primary} ${className}`}
        >
            {children}
        </button>
    );
}

export default Button;