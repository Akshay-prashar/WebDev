export function Center({children}:{children:React.ReactNode}){
    return(
        <div className="flext min-h-screen justify-center items-center">
            {children}
        </div>
    )
}