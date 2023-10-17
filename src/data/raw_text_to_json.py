from dataclasses import dataclass, field
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
class Category:
    title: str
    groups: List[Group]

@dataclass
class Tree:
    title: str
    description: str
    categories: List[Category]

def parse_raw_txt(file_path: str) -> Tree:
    with open(file_path, "r") as f:
        lines = f.readlines()

    categories = []
    current_group = None
    current_category = None
    current_subgroup = None
    current_products = []
    
    for line in lines:
        line = line.strip()
        
        if line.startswith("Category:"):
            if current_category:
                categories.append(current_category)
            current_category = Category(title=line[10:].strip(), groups=[])
        
        elif line.startswith("Group:"):
            if not current_category:
                raise ValueError("Group found before category")
            if current_group:
                current_category.groups.append(current_group)
            current_group = Group(title=line[7:].strip(), description="", subgroups=[])
        
        elif line.startswith("Description:"):
            if current_group:
                current_group.description = line[13:].strip()
        
        elif line.startswith("Subgroup:"):
            if not current_group:
                raise ValueError("Subgroup found before group")

            if current_subgroup:
                current_group.subgroups.append(current_subgroup)
            current_subgroup = Subgroup(name=line[10:].strip(), products=[])
        
        elif line.startswith("- [ ]"):
            parts = line[5:].strip().split("- [ ]")
            company = parts[0].strip()
            product = parts[1].strip() if len(parts) > 1 else ""
            current_products.append(Product(company, product))
    
    if current_subgroup:
        if not current_group:
            raise ValueError("Subgroup found before group")

        current_subgroup.products = current_products
        current_group.subgroups.append(current_subgroup)
    
    if current_group:
        if not current_category:
            raise ValueError("Group found before category")

        current_category.groups.append(current_group)
        
    if current_category:
        categories.append(current_category)
        
    return Tree(title="Your Title", description="Your Description", categories=categories)

if __name__ == "__main__":
    tree = parse_raw_txt("raw.txt")
    json_output = json.dumps(tree, default=lambda x: x.__dict__, indent=4)
    with open("raw.ts", "w") as f:
        f.write(json_output)
