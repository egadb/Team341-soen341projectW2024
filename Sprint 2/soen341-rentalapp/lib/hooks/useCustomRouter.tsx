import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";

const useCustomRouter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = { search: "" };

  let search = searchParams.get("search");

  if (search) query.search = search;
  const pushQuery = ({ search }) => {
    if (search !== undefined){
        search === '' ? delete query.search :
    }
  };
  return { searchParams, query };
};

export default useCustomRouter;
