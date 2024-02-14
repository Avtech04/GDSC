const mongoose = require('mongoose');

const counterSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  sequence_value: { type: Number, default: 1 }
});

const Counter = mongoose.model('Counter', counterSchema);

const orderSchema = new mongoose.Schema({
    orderid: {
        type: Number,
        unique: true,
    },
    food_type: String,
    freshness: String,
    quantity: Number,
    userCoordinate:[],
    order_email: String,
    NgoId:String,
    LocationId:String,
    status:{
        type:Boolean,
        default:false,
    }
}, { timestamps: true });

// Middleware to increment the orderid before saving
orderSchema.pre('save', function(next) {
    const doc = this;
    Counter.findByIdAndUpdate(
        { _id: 'orderid' },
        { $inc: { sequence_value: 1 } },
        { new: true, upsert: true }
    )
    .then(counter => {
        doc.orderid = counter.sequence_value;
        next();
    })
    .catch(error => {
        next(error);
    });
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
