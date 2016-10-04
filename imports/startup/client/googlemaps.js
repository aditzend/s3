if (Meteor.isClient) {

  // Load the Google Maps API on startup
  Meteor.startup(() => {
    let key = googleMapsApiKey2;
    GoogleMaps.load({
      key: key,
      libraries: 'places'
    });
  });


}
