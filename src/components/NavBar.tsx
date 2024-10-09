import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { AlignJustify, LinkIcon } from "lucide-react";
import { getServerSession } from "next-auth";
import LogoutButton from "./buttons/logoutButton";
import { XataClient } from "@/lib/xata";
import { authOptions } from "@/lib/authOptions";

const xata = new XataClient();

export default async function NavBar() {
  const session = await getServerSession(authOptions);

  // Ensure session is present
  const userName = session
    ? await xata.db.pages
        .filter({
          owner: session?.user?.email as string,
        })
        .getMany()
    : [];

  return (
    <header className="sticky top-0 z-50 w-full bg-background shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2" prefetch={false}>
          <LinkIcon className="text-primary h-6 w-6" />
          <span className="text-primary font-bold tracking-wider">Linkify</span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          <Link
            href="#"
            className="text-muted-foreground hover:text-foreground"
            prefetch={false}
          >
            About
          </Link>
          <Link
            href="#"
            className="text-muted-foreground hover:text-foreground"
            prefetch={false}
          >
            Pricing
          </Link>
          <Link
            href="#"
            className="text-muted-foreground hover:text-foreground"
            prefetch={false}
          >
            Contact
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          {!session ? (
            <>
              <Link
                href="/login"
                className="hidden rounded-md px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-1 focus:ring-accent md:inline-flex"
                prefetch={false}
              >
                Login
              </Link>
              <Button size="sm" className="hidden md:inline-flex">
                Sign Up
              </Button>
            </>
          ) : (
            <div className="hidden md:inline-flex gap-4 items-center">
              {userName[0]?.uri ? (
                <a href={`/account/${userName[0].uri}`}>
                  Hello, {session.user?.name}
                </a>
              ) : (
                <span>Hello, {session.user?.name}</span> // Fallback if no page record
              )}
              <LogoutButton />
            </div>
          )}

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <AlignJustify className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="md:hidden">
              <div className="grid gap-4 p-4">
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground"
                  prefetch={false}
                >
                  About
                </Link>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground"
                  prefetch={false}
                >
                  Pricing
                </Link>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground"
                  prefetch={false}
                >
                  Contact
                </Link>
                <div className="flex flex-col gap-2">
                  {!session ? (
                    <>
                      <a href="/login">
                        <Button className="flex w-full" variant="outline">
                          Sign In
                        </Button>
                      </a>
                      <Button size="sm">Sign Up</Button>
                    </>
                  ) : (
                    <>
                      {userName[0]?.uri ? (
                        <a href={`/account/${userName[0].uri}`}>
                          Hello, {session.user?.name}
                        </a>
                      ) : (
                        <span>Hello, {session.user?.name}</span> // Fallback if no page record
                      )}
                      <LogoutButton />
                    </>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
