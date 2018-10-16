<template>
  <div>
    <b-alert variant="danger"
            dismissible
            :show="error"
            fade>
      Could not fetch data.
      <b-button :to="{ name: 'home' }">Back</b-button>
    </b-alert>

    <div v-if="resource">
      <h1>
        <b-button class="mb-2" size="sm" variant="primary" :to="{ name: 'home' }">
          <icon class="fa-icon text-white"
                name="arrow-left"></icon>
        </b-button>
        <span v-text="resource.name" />
      </h1>
      <b-card v-for="(item, itemName) in resource" :key="itemName" :title="itemName">
        <p class="card-text" v-text="item"></p>
      </b-card>
    </div>
  </div>
</template>

<script>
import { getResourceDetails } from '@/api';

export default {
  name: 'ResourceDetails',
  props: {
    type: String,
    id: String,
  },
  data() {
    return {
      resource: null,
      error: false,
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      this.error = false;

      this.$Progress.start();

      try {
        this.resource = await getResourceDetails(this.type, this.id);
      } catch (e) {
        this.error = true;
        this.$router.push({ name: 'home' });
      } finally {
        this.$Progress.finish();
      }
    },
  },
};
</script>
