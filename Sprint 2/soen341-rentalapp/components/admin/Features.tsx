import CreateItemButton from "./CreateItemButton";
import SearchForm from "./SearchForm";

const Features = (params: any) => {
  return (
    <div className="mb-1 flex place-content-between items-center">
      <CreateItemButton newItemModel={params.newItemModel} />
      <SearchForm />
    </div>
  );
};

export default Features;
