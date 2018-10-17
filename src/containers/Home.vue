<template>
  <div>
    <div class="filters-container">
      <div class="row">
        <div class="col-sm-3"
              v-for="type in types"
              :key="type">
          <b-form-checkbox :checked="selectedTypes.indexOf(type) > -1"
                           @change="updateSelectedTypes(type, $event)">
            <div class="d-inline-block">
              {{ type }}
              <b-btn v-b-toggle="type"
                    class="px-1 py-0"
                    size="sm"
                    variant="outline-primary"
                    v-show="selectedTypes.indexOf(type) > -1">
                Advanced
              </b-btn>
            </div>
          </b-form-checkbox>
        </div>
        <div class="col-sm-3 mt-3 mt-sm-0">
          <b-button variant="primary"
                    class="search-button"
                    :dismiss="loading"
                    @click.prevent="fetchData">
                    Search
          </b-button>
        </div>
      </div>
      <b-collapse v-for="type in types"
                  :key="type"
                  :id="type"
                  class="bg-light p-2"
                  v-show="selectedTypes.indexOf(type) > -1">
        <small class="text-uppercase font-weight-bold" v-text="type" />
        <div class="row">
          <div class="col-sm-4" v-for="searchable in Object.keys(params[type])"
              :key="`${type}${searchable}`">
            <div v-if="params[type][searchable].type === String">
              <b-form-group :label="`${searchable}:`"
                            :label-for="`${type}${searchable}`">
                <b-form-input :id="`${type}${searchable}`"
                              type="text"
                              size="sm"
                              v-model="params[type][searchable].value"
                              :placeholder="`Enter ${searchable}`">
                </b-form-input>
              </b-form-group>
            </div>
            <div v-if="params[type][searchable].type === Boolean">
              <b-form-checkbox :id="`${type}${searchable}`"
                              v-model="params[type][searchable].value">
                {{ searchable }}
              </b-form-checkbox>
            </div>
          </div>
        </div>
      </b-collapse>
    </div>
    <resource-table />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { SEARCHABLES, TYPES, getResources } from '@/api';
import ResourceTable from '@/components/ResourceTable';

const typeNames = Object.values(TYPES);

export default {
  name: 'Home',
  data() {
    return {
      params: {},
      loading: false,
      types: typeNames,
    };
  },
  created() {
    Object.keys(SEARCHABLES).forEach((type) => {
      this.params[type] = {};
      Object.keys(SEARCHABLES[type]).forEach((key) => {
        this.params[type][key] = {};
        this.params[type][key].type = SEARCHABLES[type][key];

        if (SEARCHABLES[type][key] === String) {
          this.params[type][key].value = '';
        } else {
          this.params[type][key].value = false;
        }
      });
    });

    // created is sync
    if (this.resources.length === 0) {
      this.fetchData();
    }
  },
  methods: {
    async fetchData() {
      // reset
      this.setResources([]);

      this.$Progress.start();
      this.loading = true;

      this.addIds(await getResources(this.selectedTypes, this.params));

      this.$Progress.finish();

      this.loading = false;
    },
    addIds(data) {
      const resources = data.map((r) => {
        const res = r;
        // set ID
        const id = res.url.match(/\/([\d]{1,5})$/);
        if (id && id.length > 0) {
          res.id = id[1];
        }
        return res;
      }).filter((item, pos, arr) => arr.indexOf(item) === pos);

      this.setResources(resources);
    },
    updateSelectedTypes(type, checked) {
      // copy unmutable array
      const types = this.selectedTypes.slice(0);
      const indexType = types.indexOf(type);

      if (indexType === -1 && checked) {
        types.push(type);
      } else if (indexType > -1 && !checked) {
        types.splice(indexType, 1);
      }

      this.setSelectedTypes(types);
      this.fetchData();
    },
    ...mapActions([
      'setResources',
      'setSelectedTypes',
    ]),
  },
  computed: {
    ...mapGetters([
      'resources',
      'selectedTypes',
    ]),
  },
  components: {
    ResourceTable,
  },
};
</script>
