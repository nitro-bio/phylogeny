from typing import List
from dataclasses import dataclass, asdict
from random import randint
from faker import Faker
from pprint import pprint
import json

faker = Faker()


@dataclass
class Product:
    company: str
    product: str
    company_url: str
    product_url: str
    image_url: str


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


def create_mock_product():
    return Product(
        company=faker.company(),
        product=faker.bs(),
        company_url=faker.url(),
        product_url=faker.image_url(),
        image_url=faker.image_url(),
    )


def create_mock_subgroup(subgroup_range):
    num_products = randint(*subgroup_range)
    return Subgroup(
        name=faker.name(), products=[create_mock_product() for _ in range(num_products)]
    )


def create_mock_group(num_groups, subgroup_range):
    return Group(
        title=faker.bs(),
        description=faker.sentence(),
        subgroups=[create_mock_subgroup(subgroup_range) for _ in range(num_groups)],
    )


def create_mock_tree(num_groups, subgroup_range):
    return Tree(
        title=faker.sentence(),
        description=faker.text(),
        groups=[
            create_mock_group(num_groups, subgroup_range) for _ in range(num_groups)
        ],
    )


if __name__ == "__main__":
    print("Creating mock data...")
    tree = create_mock_tree(3, (2, 5))
    print("Writing mock data as json to file...")
    with open("mock_data.json", "w") as f:
        tree_dict = asdict(tree)
        f.write(json.dumps(tree_dict, indent=4))
