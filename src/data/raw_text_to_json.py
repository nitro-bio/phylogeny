import json
from pprint import pprint
import re
from dataclasses import dataclass, field, asdict
from typing import List, Optional

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

def parse_text(input_text):
    parsed_data = []
    current_category = None
    current_group = None
    current_subgroup = None

    lines = input_text.strip().split("\n")

    for line in lines:
        if line.startswith("Category:"):
            if current_category:
                parsed_data.append(current_category)
            current_category = Category(line.split("Category:")[1].strip(), [])
        elif line.startswith("Group:"):
            current_group = Group(line.split("Group:")[1].strip(), "", [])
            current_category.groups.append(current_group)
        elif line.startswith("Description:"):
            current_group.description = line.split("Description:")[1].strip()
        elif line.startswith("Subgroup:"):
            current_subgroup = Subgroup(line.split("Subgroup:")[1].strip(), [])
            current_group.subgroups.append(current_subgroup)
        elif line.startswith("Company:"):
            company, product = re.search(r"Company: (.+) \| Product: (.+)", line).groups()
            current_subgroup.products.append(Product(company.strip(), product.strip()))

    if current_category:
        parsed_data.append(current_category)
    return Tree("Your Title", "Your Description", parsed_data)

if __name__ == "__main__":
    with open('./raw.txt', 'r') as f:
        input_text = f.read()
        
    parsed_data = parse_text(input_text)

    # Serialize the Tree object to JSON
    with open('raw.ts', 'w') as f:
        json.dump(asdict(parsed_data), f, indent=4)

    pprint(asdict(parsed_data))
