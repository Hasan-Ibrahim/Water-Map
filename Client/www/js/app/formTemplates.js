var formTemplates = {
    source: '<h4>Source Quality</h4>' +
    '<table id="water-quality">' +
    '<tr>' +
    '<td><input type="radio" name="source-state" value="Drinkable"/></td>' +
    '<td style="color: #3d832c">Drinkable</td>' +
    '<td id="PotableRatingPercent" style="color: #3d832c"></td>' +
    '</tr>' +
    '<td><input type="radio" name="source-state" value="NeedTreatment"/></td>' +
    '<td style="color: #ff7301">NeedTreatment</td>' +
    '<td id="ProcessableRatingPercent" style="color: #ff7301"></td>' +
    '</tr>' +
    '<tr>' +
    '<td><input type="radio" name="source-state" value="Undrinkable"/></td>' +
    '<td style="color: #b40909">Undrinkable</td>' +
    '<td id="UnpotableRatingPercent" style="color: #b40909"></td>' +
    '</tr>' +
    '<tr>' +
    '<tr>' +
    '<td style="color: #b68ada"><input type="radio" name="source-state" value="Unknown"/></td>' +
    '<td style="color: #b68ada">Unknown</td>' +
    '<td id="UnknownRatingPercent" style="color: #b68ada"></td>' +
    '</tr>' +
    '<tr>' +
    '<td colspan="2"><input id="submit-quality" class="button button-small button-block button-balanced" type="submit"  value="Submit" disabled="disabled"/></td>' +
    '</tr>' +
    '</table>'
};
