var formTemplates = {
    source: '<h5>Source Quality</h5>' +
    '<table id="water-quality">' +
    '<tr>' +
    '<td><input type="radio" name="source-state" value="Drinkable"/></td>' +
    '<td>Drinkable</td>' +
    '<td id="PotableRatingPercent"></td>' +
    '</tr>' +
    '<td><input type="radio" name="source-state" value="NeedTreatment"/></td>' +
    '<td>NeedTreatment</td>' +
    '<td id="ProcessableRatingPercent"></td>' +
    '</tr>' +
    '<tr>' +
    '<td><input type="radio" name="source-state" value="Undrinkable"/></td>' +
    '<td>Undrinkable</td>' +
    '<td id="UnpotableRatingPercent"></td>' +
    '</tr>' +
    '<tr>' +
    '<tr>' +
    '<td><input type="radio" name="source-state" value="Unknown"/></td>' +
    '<td>Unknown</td>' +
    '<td id="UnknownRatingPercent"></td>' +
    '</tr>' +
    '<tr>' +
    '<td colspan="2"><input id="submit-quality" type="submit"  value="Submit" disabled="disabled"/></td>' +
    '</tr>' +
    '</table>'
};
