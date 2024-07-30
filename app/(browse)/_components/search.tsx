"use client";
import qs from "query-string";
import { useState } from "react";
import { Search as Se, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
const Search = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const onsubmit = (e: React.FormEvent<HTMLFormElement>) => {
    console.log(search);
    e.preventDefault();
    if (!search) return;
    const url = qs.stringifyUrl(
      {
        url: "/search",
        query: {
          term: search,
        },
      },
      { skipEmptyString: true }
    );
    setSearch("");
    router.push(url);
  };
  const onclear = () => {
    setSearch("");
  };
  return (
    <form
      className="relative w-full lg:w-[400px] flex items-start max-lg:ml-2"
      onSubmit={onsubmit}
    >
      <Input
        placeholder="Search"
        onChange={(e) => setSearch(e.target.value)}
        value={search}
        className="rounded-r-none focus-visible:ring-0 focus-visible:ring-transparent 
      focus-visible:ring-offset-0"
      ></Input>
      {!!search && (
        <X
          className="absolute
          top-2.5 right-14 h-5 w-5 text-muted-foreground cursor-pointer hover:opacity-75 transition"
          onClick={onclear}
        />
      )}
      <Button
        type="submit"
        size={"sm"}
        variant={"secondary"}
        className="rounded-l-none"
      >
        <Se />
      </Button>
    </form>
  );
};

export default Search;
