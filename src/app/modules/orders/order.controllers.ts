import { NextFunction, Request, Response } from "express";
import { UserDocument } from "../users/user.interface";
import { IOrder } from "./order.interface";
import Order from "./order.model";

// ----------------------------------------
// -------------- Create Orders -----------    pending
// ----------------------------------------

export const createOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId, items, totalAmount } = req.body;
  // const user = req.user as UserDocument;
  try {
    if (!items) {
      return res.status(400).json({ message: "Items are required" });
    }
    if (!totalAmount) {
      return res.status(400).json({ message: "Total amount is required" });
    }
    const newOrder: IOrder = new Order({
      user: userId,
      items,
      totalAmount,
      status: "Pending",
    });
    createdAt: new Date();
    updatedAt: new Date();
    const order = await newOrder.save();
    res.status(201).json(order);
  } catch (error) {
    console.log(error);
  }
};

// ----------------------------------------
// ------------- Get All Orders -----------    pending
// ----------------------------------------

export const getAllOrders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// ----------------------------------------
// ---------- Get Single Orders -----------    pending
// ----------------------------------------

export const getSingleOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    const order = await Order.findById(id).populate("user");
    // const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json(order);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// ----------------------------------------
// ----------- Get Orders By ID -----------    pending
// ----------------------------------------

export const getOrderByUserId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    const orders = await Order.find({ user: id });
    if (!orders) {
      return res.status(404).json({ message: "Orders not found" });
    }
    res.status(200).json(orders);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// ----------------------------------------
// -------- Update Order Status -----------    pending
// ----------------------------------------

export const updateOrderStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const order = await Order.findByIdAndUpdate(
      id,
      { status: status },
      { new: true }
    );

    if (!order) {
      res.status(404).json({ message: "Order not found" });
    }
    res
      .status(200)
      .json({ message: "Order status updated successfully", order });
  } catch (error) {
    console.log(error);
    next;
  }
};
