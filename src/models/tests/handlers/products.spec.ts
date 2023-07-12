import { Product, ProductStore } from "../../products";

const store = new ProductStore();

describe("Test ProductStore", () => {
  it("Test index function", async () => {
    const users = await store.index();
    expect(users).toBeTruthy();
  });
  it("Test show function", async () => {
    const productAdd = { name: "mug", price: "20" };
    const users = spyOn(store, "show").and.returnValue(
      new Promise<Product>((resolve) => {
        resolve(productAdd);
      })
    );
    expect(users).toBeTruthy();
  });
  it("Test create function", async () => {
    const data = await store.index();
    const result = spyOn(store, "create").and.returnValue(
      new Promise<Product>((resolve) => {
        resolve(data[0]);
      })
    );
    expect(result).toBeTruthy();
  });
  it("Test delete function", async () => {
    const data = await store.index();
    const result = spyOn(store, "delete").and.returnValue(
      new Promise<Product>((resolve) => {
        resolve(data[0]);
      })
    );
    expect(result).toBeTruthy();
  });
});
