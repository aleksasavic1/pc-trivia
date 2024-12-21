function Button({children, ...props}) {
    return (
        <button {...props} className="bg-slate-400 py-2 px-4 rounded text-cyan-100 hover:bg-slate-400/80">
            {children}
        </button>
    );
}

export default Button;