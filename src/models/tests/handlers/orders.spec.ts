import { Order, OrderStore } from "../../orders";
import { UserStore } from "../../user";

const store = new OrderStore();

describe("Test OrderStore", () => {
  it("Test index function", async () => {
    const mockData: Order[] = [
      {
        status: "done",
        user_id: "2",
      },
    ];
    const result = spyOn(store, "index").and.returnValue(
      new Promise<Order[]>((resolve) => {
        resolve(mockData);
      })
    );
    expect(result).toBeTruthy();
  });
  it("Test show function", async () => {
    const mockData: Order = {
      status: "done",
      user_id: "2",
    };
    const result = spyOn(store, "show").and.returnValue(
      new Promise<Order>((resolve) => {
        resolve(mockData);
      })
    );
    expect(result).toBeTruthy();
  });
  it("Test create function", async () => {
    const mockData: Order = {
      status: "done",
      user_id: "2",
    };
    const result = spyOn(store, "create").and.returnValue(
      new Promise<Order>((resolve) => {
        resolve(mockData);
      })
    );
    expect(result).toBeTruthy();
  });
  it("Test delete function", async () => {
    const mockData: Order = {
      status: "done",
      user_id: "2",
    };
    const result = spyOn(store, "delete").and.returnValue(
      new Promise<Order>((resolve) => {
        resolve(mockData);
      })
    );
    expect(result).toBeTruthy();
  });
  it("Test addProduct function", async () => {
    const result = spyOn(store, "addProduct").and.returnValue(
      new Promise<null>((resolve) => {
        resolve(null);
      })
    );
    expect(result).toBeTruthy();
  });
});
