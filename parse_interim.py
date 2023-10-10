import re
from dataclasses import dataclass, field
from typing import List


@dataclass
class Product:
    company: str
    product: str
    companyURL: str = "http://placeholder.url"
    productURL: str = "http://placeholder.url"
    imageURL: str = "http://placeholder.url"


@dataclass
class Subgroup:
    name: str
    products: List[Product] = field(default_factory=list)


@dataclass
class Group:
    title: str
    description: str
    subgroups: List[Subgroup] = field(default_factory=list)


# Parsing function
def parse_txt(txt_data: str) -> Group:
    lines = txt_data.split("\n")
    group_data = Group("", "", [])

    subgroup_data = Subgroup(name="", products=[])
    for line in lines:
        if line.startswith("Group:"):
            group_data.title = line.split("Group:")[1].strip()
        elif line.startswith("Description:"):
            group_data.description = line.split("Description:")[1].strip()
        elif line.startswith("Subgroup:"):
            if subgroup_data:  # If there's existing subgroup_data, append it
                group_data.subgroups.append(subgroup_data)

            subgroup_data = Subgroup(line.split("Subgroup:")[1].strip(), [])
        elif line.startswith("- [ ]"):
            product_name = line.split("- [ ]")[1].strip()
            company, product = (
                product_name.split(" ") if " " in product_name else (product_name, "")
            )
            subgroup_data.products.append(Product(company, product))

    if subgroup_data:
        group_data.subgroups.append(subgroup_data)

    return group_data


if __name__ == "__main__":
    filename = "eln.txt"
    with open(filename, "r") as f:
        data = f.read()
    parsed_data = parse_txt(data)
    with open(filename.replace(".txt", ".json"), "w") as f:
        f.write(str(parsed_data))
    print(parsed_data)
