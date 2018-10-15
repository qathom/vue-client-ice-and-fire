<template>
  <div>
    <b-table striped hover :items="items" :fields="fields">
      <template slot="name" slot-scope="data">
        <div v-if="data.item.name !== ''" v-text="data.item.name"></div>
        <div v-if="data.item.aliases">
          <small>Aliases</small>
          <div v-text="data.item.aliases.join(',')"></div>
        </div>
        <div v-if="data.item.name === ''"><em>Real name is unknown</em></div>
      </template>

      <template slot="details" slot-scope="data">
        <div v-if="data.item.type === TYPES.BOOK">
          <div v-text="`ISBN: ${data.item.isbn}`"></div>
          <div v-text="`Publisher: ${data.item.publisher}`"></div>
          <div v-text="`Released: ${data.item.released}`"></div>
        </div>
        <div v-if="data.item.type === TYPES.CHARACTER">
          <div v-if="data.item.culture !== ''" v-text="`Culture: ${data.item.culture}`"></div>
          <div v-if="data.item.died === ''">Alive</div>
          <div v-if="data.item.died !== ''" v-text="`Died: ${data.item.died}`"></div>
        </div>
        <div v-if="data.item.type === TYPES.HOUSE">
          <div v-if="data.item.region !== ''" v-text="`Region: ${data.item.region}`"></div>
          <div v-if="data.item.words !== ''" v-text="`Words: ${data.item.words}`"></div>
        </div>
      </template>

      <template slot="link" slot-scope="data">
        <b-link
          :to="{ name: 'resource-details', params: { type: data.item.type, id: data.item.id } }">
          More
        </b-link>
      </template>
    </b-table>
    <b-alert :show="items.length === 0" variant="warning">No data to show.</b-alert>
  </div>
</template>

<script>
import { TYPES } from '@/api';

export default {
  name: 'ResourceTable',
  props: {
    items: Array,
  },
  data() {
    return {
      search: '',
      TYPES,
      fields: [
        { key: 'name', sortable: true },
        { key: 'details', sortable: true },
        { key: 'type', sortable: true },
        { key: 'link', sortable: false },
      ],
    };
  },
};
</script>
