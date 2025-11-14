export const NoScriptLoader = () => {
    return (
        <noscript>
            <style>{`html, body {overflow: hidden !important; height: 100% !important;}`}</style>
            <div className='flex items-center justify-center bg-gray-900 p-6 md:p-4 fixed inset-0 z-9999'>
                <div className='text-white text-center text-lg md:text-xl'>
                    <h1>JavaScript is disabled in your browser.</h1>
                    <p>Please enable it to use this site.</p>
                </div>
            </div>
        </noscript>
    );
}