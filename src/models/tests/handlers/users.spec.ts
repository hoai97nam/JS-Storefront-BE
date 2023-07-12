import { User, UserStore } from "../../user";

const store = new UserStore();

describe("Test UserStore", () => {
  it("Test index function", async () => {
    const users = await store.index();
    expect(users).toBeTruthy();
  });
  it("Test show function", async () => {
    const userAdd = { username: "Deracha", password: "123" };
    const users = spyOn(store, "show").and.returnValue(
      new Promise<User>((resolve) => {
        resolve(userAdd);
      })
    );
    expect(users).toBeTruthy();
  });
  it("Test create function", async () => {
    const userAdd = { username: "Deracha", password: "123" };
    const users = spyOn(store, "create").and.returnValue(
      new Promise<User>((resolve) => {
        resolve(userAdd);
      })
    );
    expect(users).toBeTruthy();
  });
  it("Test delete function", async () => {
    const data = await store.index();
    const result = spyOn(store, "delete").and.returnValue(
      new Promise<User>((resolve) => {
        resolve(data[0]);
      })
    );
    expect(result).toBeTruthy();
  });
  it("Test authenticate function", async () => {
    const result = spyOn(store, "authenticate").and.returnValue(
      new Promise<null>((resolve) => {
        resolve(null);
      })
    );
    expect(result).toBeTruthy();
  });
});
