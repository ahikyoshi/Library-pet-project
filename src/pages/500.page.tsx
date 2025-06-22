import { Button } from "@/components/Button";
import Link from "next/link";

export default function Page() {
    <main className="w-full h-[calc(100vh-48px)] flex items-center justify-center">
        <div className="grid gap-10">
            <h1 className="text-4xl flex items-center">
                <span className="ml-4">Страница не найдена</span>
            </h1>
            <Link href={"/catalog"}>
                <Button variant="primary" text="Вернуться в каталог" />
            </Link>
        </div>
    </main>;
}
