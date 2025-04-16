import json
import click
import tensorflow_hub as hub
import numpy as np
from typing import List, Dict


@click.command()
@click.argument("input_path", type=click.Path(exists=True))
@click.argument("output_path", type=click.Path())
def generate_embeddings(input_path: str, output_path: str) -> None:
    """
    Generate embeddings for the given pages and save them to a JSON file.

    Arguments:
    - input_path: Path to a JSON file containing an array of objects with 'title' and 'content'.
    - output_path: Path where the output embeddings JSON file will be saved.

    Example usage:
    python generate_embeddings.py pages.json embeddings.json
    """

    # Load input JSON
    with open(input_path, "r", encoding="utf-8") as f:
        pages: List[Dict[str, str]] = json.load(f)
    print(pages[0])
    # Extract texts and compute embeddings
    contents: List[str] = [page["content"] for page in pages]
    print(contents[0])
    print("Loading Universal Sentence Encoder model...")
    model = hub.load("https://tfhub.dev/google/universal-sentence-encoder/4")
    print("Model loaded successfully!")

    output_data: List[Dict[str, List[float]]] = []

    for content in contents:
        print()
        print(content)
        embeddings: np.ndarray = model(content).numpy()
        print(embeddings)
        output_data.append({"content": content, "embeddings": embeddings.tolist()})
    # # Prepare output data
    # output_data: List[Dict[str, str | List[float]]] = [
    #     {
    #         "title": pages[i]["title"],
    #         "content": pages[i]["content"],
    #         "embedding": embeddings[i].tolist(),
    #     }
    #     for i in range(len(pages))
    # ]

    # # Save embeddings to output file
    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(output_data, f, indent=2)

    print(f"Embeddings successfully saved to {output_path}")


if __name__ == "__main__":
    generate_embeddings()
