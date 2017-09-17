// Write your JavaScript code.



//function TireSize(string) {


//}

(function ($) {
    $.fn.TireSizeSearch = function (options) {
        var that = this;
        var defaults = {
            AppendToDisplay: false,
            AppendToClass: "",
            ContentousInput: true,
            SpaceDelimited: false,
            NoramlTireSize: false,
            ApplyRadio: false,
            CheckRadio:true,
            ContentousInputName: '1',
            SpaceDelimitedName: '2',
            NoramlTireSizeName: '3',
            Width: this[0].value.substring(0, 3),
            Ratio: this[0].value.slice(3, 5),
            Rim: this[0].value.slice(5, 8),
            SizeArr: function () {
                var arr = [];
                if (that[0].value.indexOf(" ")) {
                    var SizeArr = that[0].value.split(' ');
                    arr[0] = SizeArr[0];
                    arr[1] = SizeArr[1];
                    arr[2] = SizeArr[2];
                }
                return arr;
            },
            ManuleSearchFunction: function () {
                var str = that[0].value;
                var patt = new RegExp("(?=.*\/)(?=.*[a-zA-Z])");
                var res = patt.test(str);
                var arr = [];
                if (res) {
                    arr[0] = str.substring(0, 3);
                    arr[1] = str.substring(str.indexOf("/") + 1, 6);
                    arr[2] = str.substring(7, str.length);
                    return arr;
                } 
            },
            AppendOutPut: function () {
                document.getElementById(options.AppendToClass) ? document.getElementById(options.AppendToClass).remove() : '';
                that.parent().append("<div id='" + options.AppendToClass + "'></div>");
                return null;
            },
            PlaceRadioButtons: function () {
                that.parent().prepend("<div style='display:block'>" +
                    "<div class='btn-group' data-toggle='buttons'>" +
                    "<label class='btn btn-primary active'>" +
                    "<input type='radio' name='options' id='ContentousInput'>" + defaults.ContentousInputName + "</label>" +
                    "<label class='btn btn-primary'>" +
                    "<input type='radio' name='options' id='SpaceDelimited'>" + defaults.SpaceDelimitedName + "</label>" +
                    "<label class='btn btn-primary'>" +
                    "<input type='radio' name='options' id='NoramlTireSize'>" + options.NoramlTireSizeName + "</label>" +
                    "</div></div>");
            },

        };

        var options = $.extend(defaults, options);
        options.AppendToDisplay == true ? options.AppendOutPut.apply() : "";
        if (options.ApplyRadio == true) {
            options.PlaceRadioButtons.apply();  
            var rd = document.getElementsByName("options");
            for (var i = 0, max = rd.length; i < max; i++) {
                rd[i].onchange = function () {
                    document.getElementById(options.AppendToClass).textContent = "";
                    that[0].value = "";
                }

            }
        }
        if (options.CheckRadio == true) {
            if (document.getElementById("ContentousInput").checked) {
                options.NoramlTireSize = false;
                options.ContentousInput = true;
                options.SpaceDelimited = false;
            } else if (document.getElementById("SpaceDelimited").checked) {
                options.NoramlTireSize = true;
                options.ContentousInput = false;
                options.SpaceDelimited = true;
            } else if (document.getElementById("NoramlTireSize").checked) {
                options.NoramlTireSize = true;
                options.ContentousInput = false;
                options.SpaceDelimited = false;
            }
        } else {
            if (that[0].value.indexOf(" ") > -1) {
                options.NoramlTireSize = true;
                options.ContentousInput = false;
                options.SpaceDelimited = true;
            } else if (that[0].value.indexOf("/") > -1) {
                options.NoramlTireSize = true;
                options.ContentousInput = false;
                options.SpaceDelimited = false;
            } else {
                options.NoramlTireSize = false;
                options.ContentousInput = true;
                options.SpaceDelimited = false;
            }
        }
        function isUndefined(string) {
            var re = string == undefined ? '' : string;
            return re;
        }
        if (options.ContentousInput == true) {
            if (options.AppendToDisplay == true) {
                if (isUndefined(options.Width) == "") {
                    document.getElementById(options.AppendToClass).textContent = "";
                }else{
                document.getElementById(options.AppendToClass).textContent = isUndefined(options.Width) + '/' +
                    isUndefined(options.Ratio) + 'R' +
                        isUndefined(options.Rim);
                }
            }
           
            return [options.Width, options.Ratio, options.Rim];
        } else if (options.SpaceDelimited == true) {
            if (options.AppendToDisplay == true) {
                if (options.SizeArr.apply()[0] == "") {
                    document.getElementById(options.AppendToClass).textContent = "";
                } else { 
                document.getElementById(options.AppendToClass).textContent = isUndefined(options.SizeArr.apply()[0]) + '/' +
                    isUndefined(options.SizeArr.apply()[1]) + 'R' +
                        isUndefined(options.SizeArr.apply()[2]);
                }
            }
           
            return options.SizeArr.apply();
        } else if (options.NoramlTireSize == true) {
            if (options.AppendToDisplay == true) {
                if (isUndefined(options.ManuleSearchFunction.apply()[0]) == "") {
                    document.getElementById(options.AppendToClass).textContent = "";
                } else {
                    document.getElementById(options.AppendToClass).textContent = isUndefined(options.ManuleSearchFunction.apply()[0]) + '/' +
                        isUndefined(options.ManuleSearchFunction.apply()[1]) + 'R' +
                        isUndefined(options.ManuleSearchFunction.apply()[2]);
                }
            }
            return options.ManuleSearchFunction.apply();
        }
    };
})(jQuery);