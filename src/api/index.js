import axios from 'axios';
import asyncForEach from '@/utils/foreach';

const instance = axios.create({
  baseURL: 'https://www.anapioficeandfire.com/api',
});

/*
 * Resource types
 */
export const TYPES = Object.freeze({
  BOOK: 'books',
  CHARACTER: 'characters',
  HOUSE: 'houses',
});

/*
 * "searchable" fields available in the API
 */
export const SEARCHABLES = {};

SEARCHABLES[TYPES.BOOK] = {
  name: String,
  fromReleaseDate: Date,
  toReleaseDate: Date,
};

SEARCHABLES[TYPES.CHARACTER] = {
  name: String,
  gender: String,
  culture: String,
  born: String,
  died: String,
  isAlive: Boolean,
};

SEARCHABLES[TYPES.HOUSE] = {
  name: String,
  region: String,
  words: String,
  hasWords: Boolean,
  hasTitles: Boolean,
  hasSeats: Boolean,
  hasDiedOut: Boolean,
  hasAncestralWeapons: Boolean,
};

/**
 * Add the resource type in a given array
 *
 * @param {Array} resources
 * @param {String} type
 */
function addResourcesType(resources = [], type) {
  const finalResources = resources.map((resource) => {
    const r = resource;
    r.type = type;
    return r;
  });

  return finalResources;
}

/**
 * API call
 * Retrieves a given resource type (for example books)
 * with given parameters
 *
 * @param {String} resourceType
 * @param {Object} params
 */
async function queryResource(resourceType, params = {}) {
  if (Object.values(TYPES).indexOf(resourceType) === -1) {
    throw new Error(`Unknown type ${resourceType}`);
  }

  const resourceParams = {};

  Object.keys(params[resourceType]).forEach((field) => {
    const fieldObj = params[resourceType][field];
    if (fieldObj.type === String && fieldObj.value !== '') {
      resourceParams[field] = fieldObj.value;
    } else if (fieldObj.type === Boolean) {
      resourceParams[field] = fieldObj.value;
    }
  });

  const res = await instance.get(`/${resourceType}`, { params: resourceParams });
  const resources = addResourcesType(res.data, resourceType);

  return resources;
}

/**
 * Retrieves the relevant resources with given parameters
 *
 * @param {Array} types
 * @param {Object} params
 */
export async function getResources(types, params = {}) {
  let resources = [];

  await asyncForEach(types, async (resourceType) => {
    resources = [...resources, ...await queryResource(resourceType, params)];
  });

  return resources;
}

/**
 * Retrieves a specific resource
 *
 * @param {String} type
 * @param {Number|String} id
 */
export async function getResourceDetails(type, id) {
  const res = await instance.get(`/${type}/${id}`);
  return res.data;
}
