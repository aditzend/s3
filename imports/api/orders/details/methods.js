Meteor.methods({
  createOrderDetail(tood) {
    return OrderDetails.insert(tood);
  },
  removeOrderDetail(orderDetailId) {
    OrderDetails.remove(orderDetailId);
  },
  createOrder(ownerId) {
    return Orders.insert({
      owner: ownerId,
      soldProducts: []
    });
  }
});