import AuthButton from "../components/AuthButton";
import LeadFunnel from "./pages/lead-funnel"

export default async function Index() {

  //This variable needs to be in place for the lead form
  //Only change this localy to work on the main application
  //true = leadfunnel
  //false = development
  const dev = true;

  return (
    <div>
      {
        dev ? (
          <LeadFunnel />
        ) : (
          <div className="flex-1 w-full flex flex-col gap-20 items-center">
            <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
              <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
                {<AuthButton />}
              </div>
            </nav>

            <div className="animate-in flex-1 flex flex-col gap-20 opacity-0 max-w-4xl px-3">
              <main className="flex-1 flex flex-col gap-6">
                <h2 className="font-bold text-4xl mb-4">Next steps</h2>
              </main>
            </div>

            <footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs">
              <p>
                Powered by{" "}
                <a
                  href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
                  target="_blank"
                  className="font-bold hover:underline"
                  rel="noreferrer"
                >
                  Supabase
                </a>
              </p>
            </footer>
          </div>
        )}
    </div>
  );
}
