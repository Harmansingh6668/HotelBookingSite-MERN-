function Input({ 
    label,
    type = "text",
    placeholder = "",
    value, 
    onChange, 
    name, 
    id, 
    required = false, 
    disabled = false, 
    className = "" 
}) {
    return (
        <div className={`flex w-full flex-col gap-1.5`}>
            {label && (
                <label htmlFor={id || name} className="text-sm font-medium text-[#1F2925]">
                    {label}
                </label>
            )}

            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                name={name}
                id={id || name}
                required={required}
                disabled={disabled}
                className={`w-full rounded-[10px] border border-[#DDE5DF] bg-white px-4 py-3 text-sm text-[#1F2925] outline-none transition-all duration-200 placeholder:text-[#8958F] focus:border-[#0B4F3A] focus:ring-4 focus:ring-[#0B4F3A]/10 disabled:cursor-not-allowed disabled:bg-[#F2F5F1] ${className}`}
            />
        </div>
    )

}

export default Input;