app.component("product-display", {
  props: {
    premium: {
      type: Boolean,
      required: true,
    },
  },
  /*html*/
  template: `<div class="product-display">
    <div class="product-container">
      <div class="product-image" :class="{ 'out-of-stock-img' : !inStock }">
        <!-- image goes here -->
        <img v-bind:src="image" />
        <!-- src attribute bound to the image data -->
      </div>
      <div class="product-info">
        <!-- will reactively receive any updates to product -->
        <h1>{{ title }}</h1>
        <!-- Conditional rendering -->
        <!-- Using v if and else to render -->
        <p>Shipping: {{ shipping }}</p>

        <p v-if="inStock">In Stock</p>
        <p v-else>Out of Stock</p>
        <!-- Keeps element on page but toggles visibility -->
        <p v-show="onSale">On Sale</p>
        <!-- Product details List render -->
        <ul>
          <li v-for="detail in details">{{ detail }}</li>
        </ul>
        <div
          v-for="(variant, index) in variants"
          :key="variant.id"
          @mouseover="updateVariant(index)"
          class="color-circle"
          :style="{backgroundColor: variant.color}"
        ></div>
        <button
          class="button"
          :class="{ disabledButton: !inStock }"
          :disabled="!inStock"
          @click="addToCart"
        >
          Add to Cart
        </button>
      </div>
    </div>
    <review-list v-if="reviews.length" :reviews="reviews"></review-list>
    <review-form @review-submitted="addReview"></review-form>
  </div>`,
  data() {
    return {
      product: "Socks",
      brand: "Vue Mastery",
      selectedVariant: 0,
      onSale: true,
      details: ["50% cotton", "30% wool", "20% polyester"],
      reviews: [],
      variants: [
        {
          id: 2234,
          color: "green",
          image: "./assets/images/socks_green.jpg",
          quantity: 0,
        },
        {
          id: 2235,
          color: "blue",
          image: "./assets/images/socks_blue.jpg",
          quantity: 50,
        },
      ],
    };
  },
  methods: {
    addToCart() {
      this.$emit("add-to-cart", this.variants[this.selectedVariant].id);
    },
    updateVariant(index) {
      this.selectedVariant = index;
    },
    addReview(review) {
      this.reviews.push(review);
    },
  },

  computed: {
    shipping() {
      if (this.premium) {
        return "Free";
      }
      return 2.99;
    },
    title() {
      return this.brand + " " + this.product;
    },
    image() {
      return this.variants[this.selectedVariant].image;
    },
    inStock() {
      return this.variants[this.selectedVariant].quantity > 0 ? true : false;
    },
  },
});
