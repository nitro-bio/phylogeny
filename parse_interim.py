from dataclasses import dataclass, field, asdict
from typing import List, Optional
import json

@dataclass
class Product:
    company: str
    product: str
    company_url: Optional[str] = None
    product_url: Optional[str] = None
    image_url: Optional[str] = None

@dataclass
class Subgroup:
    name: str
    products: List[Product]

@dataclass
class Group:
    title: str
    description: str
    subgroups: List[Subgroup]

@dataclass
class Tree:
    title: str
    description: str
    groups: List[Group]

def parse_raw_text(file_path):
    with open(file_path, 'r') as f:
        lines = f.readlines()

    # Initialize variables
    current_group = None
    current_subgroup = None
    current_products = []
    groups = []

    # Loop through each line to parse
    for line in lines:
        line = line.strip()
        if line.startswith("Group:"):
            if current_group:
                groups.append(current_group)
            title = line.split("Group:")[1].strip()
            current_group = Group(title, "", [])
            current_subgroup = None
            current_products = []
        elif line.startswith("Description:"):
            desc = line.split("Description:")[1].strip()
            if current_group:
                current_group.description = desc
        elif line.startswith("Subgroup:"):
            if current_subgroup:
                current_group.subgroups.append(current_subgroup)
            name = line.split("Subgroup:")[1].strip()
            current_subgroup = Subgroup(name, [])
        elif line.startswith("- [ ]"):
            company_line = line.split("- [ ]")[1].strip()
            product = Product(company_line, "")
            current_subgroup.products.append(product)

    if current_group:
        groups.append(current_group)

    tree = Tree("Root", "Root Description", groups)

    return tree

if __name__ == "__main__":
    tree = parse_raw_text('raw.md')
    json_str = json.dumps(asdict(tree), indent=4)
    print(json_str)
