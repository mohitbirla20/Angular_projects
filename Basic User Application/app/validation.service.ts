import { Injectable } from "@angular/core";

@Injectable()
export class ValidationService {

    validate(id: string) {

        var isValue = true;
        var elements = document.getElementById(id);
        if (elements != null) {
            var childNodes = elements.getElementsByClassName('sphinxform')
            var paras = elements.getElementsByClassName('spx-div');
            for (var temp = paras.length - 1; temp >= 0; temp--) {
                paras[temp].parentNode?.removeChild(paras[temp]);
            }

            for (var i = 0; i < childNodes.length; i++) {
                var formControl = childNodes[i];
                if (formControl.getAttribute('type') != "hidden") {
                    var validation = formControl.getAttribute('spx-validation');
                    var message = formControl.getAttribute('spx-message');
                    if (validation) {
                        if (message) {
                            var textValue = (<HTMLInputElement>formControl).value;
                            validation = validation.replace("[", "");
                            validation = validation.replace("]", "");
                            message = message.replace("['", "");
                            message = message.replace("']", "");
                            var list = validation.split(",");
                            var messageList = message.split("','")
                           validationKeys:
                            for (var j = 0; j < list.length; j++) {
                                for (var n = j; n < messageList.length; n++) {
                                    if (list[j].trim() == 'REQUIRED') {
                                        if (!textValue || textValue.trim() == '') {
                                            var div = this.errorMessage(messageList[n]);
                                            if (formControl.parentNode != null) {
                                                formControl.parentNode.insertBefore(div, formControl.nextSibling);
                                            }

                                            isValue = false;
                                            break validationKeys;
                                        }
                                    }

                                    if (list[j].trim() == 'TEXTAREA') {
                                        if (!textValue || textValue.trim() == '') {
                                            var div = this.errorMessage(messageList[n]);
                                            if (formControl.parentNode != null) {
                                                formControl.parentNode.insertBefore(div, formControl.nextSibling);
                                            }
                                            isValue = false;
                                            break validationKeys;
                                        }
                                    }

                                    if (list[j].trim() == 'DOUBLE_NUMBER') {
                                        var numbers = /^[0-9]+$/;
                                        var numbersDecimal = /^-?\d*[.]?\d*$/;
                                        if (!textValue.match(numbers) && !textValue.match(numbersDecimal)) {
                                            var div = this.errorMessage(messageList[n]);
                                            if (formControl.parentNode != null) {
                                                formControl.parentNode.insertBefore(div, formControl.nextSibling);
                                            }
                                            isValue = false;
                                            break validationKeys;
                                        }
                                    }

                                    if (list[j].trim() == 'INTEGER_NUMBER') {
                                        var numbers = /^[0-9]+$/;
                                        if (!textValue.match(numbers)) {
                                            var div = this.errorMessage(messageList[n]);
                                            if (formControl.parentNode != null) {
                                                formControl.parentNode.insertBefore(div, formControl.nextSibling);
                                            }
                                            isValue = false;
                                            break validationKeys;
                                        }
                                    }

                                    if (list[j].trim().startsWith('LIMIT_')) {
                                        var limit = validation.split("_");
                                        if (textValue.length + "" != limit[1]) {
                                            var div = this.errorMessage(messageList[n]);
                                            if (formControl.parentNode != null) {
                                                formControl.parentNode.insertBefore(div, formControl.nextSibling);
                                            }
                                            isValue = false;
                                            break validationKeys;
                                        }
                                    }

                                    if (list[j].trim() == 'EMAIL') {
                                        var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
                                        if (reg.test(textValue) == false) {

                                            var div = this.errorMessage(messageList[n]);
                                            if (formControl.parentNode != null) {
                                                formControl.parentNode.insertBefore(div, formControl.nextSibling);
                                            }
                                            isValue = false;
                                            break validationKeys;
                                        }
                                    }

                                    if (list[j].trim() == 'PHONE_NUMBER') {
                                        var phoneRegEx = /^(?=.*[0-9])[- +()0-9]+$/;
                                        var sizeRegEX = /[0-9]{8,15}/;
                                        if (!textValue.match(phoneRegEx) || !textValue.match(sizeRegEX)) {
                                            var div = this.errorMessage(messageList[n]);
                                            if (formControl.parentNode != null) {
                                                formControl.parentNode.insertBefore(div, formControl.nextSibling);
                                            }
                                            isValue = false;
                                            break validationKeys;
                                        }
                                    }

                                    if (list[j].trim() == 'SELECT') {
                                        var optionValue = (<HTMLSelectElement>formControl).options[(<HTMLSelectElement>formControl).selectedIndex].value;
                                        if (!optionValue) {
                                            var div = this.errorMessage(messageList[n]);
                                            if (formControl.parentNode != null) {
                                                formControl.parentNode.insertBefore(div, formControl.nextSibling);
                                            }
                                            isValue = false;
                                            break validationKeys;
                                        }
                                    }

                                    if (list[j].trim() == 'FILE') {
                                        if (!textValue || textValue.trim() == '') {
                                            var div = this.errorMessage(messageList[n]);
                                            if (formControl.parentNode != null) {
                                                formControl.parentNode.insertBefore(div, formControl.nextSibling);
                                            }
                                            isValue = false;
                                            break validationKeys;
                                        }
                                    }

                                    if (list[j].trim() == 'RADIO') {
                                        var groupRadio = document.getElementsByName((<HTMLSelectElement>formControl).name);
                                        for (var m = 0; m < groupRadio.length; m++) {

                                            if ((<HTMLInputElement>groupRadio[m]).checked) {
                                                break validationKeys;
                                            }

                                            if (m == groupRadio.length - 1) {
                                                var div = this.errorMessage(messageList[n]);
                                                if (formControl.parentNode != null) {
                                                    formControl.parentNode.insertBefore(div, formControl.nextSibling);
                                                }
                                                isValue = false;
                                                break validationKeys;

                                            }
                                        }
                                    }
                                    if (list[j].trim() == 'CHECKBOX') {

                                        var group = document.getElementsByName((<HTMLSelectElement>formControl).name);
                                        for (var s = 0; s < group.length; s++) {



                                            if ((<HTMLInputElement>group[s]).checked) {
                                                break validationKeys;
                                            }

                                            if (s == group.length - 1) {
                                                var div = this.errorMessage(messageList[n]);
                                                if (formControl.parentNode != null) {
                                                    formControl.parentNode.insertBefore(div, formControl.nextSibling);
                                                }
                                                isValue = false;
                                                break validationKeys;

                                            }
                                        }
                                    }
                                    if (list[j].trim() == 'CONFIRM_PASSWORD') {
                                        var isMatch = false;
                                        if (textValue) {
                                            passwordLoop:
                                            for (var k = 0; k < childNodes.length; k++) {
                                                var passControl = childNodes[k];
                                                var validationPass = passControl.getAttribute('spx-validation');
                                                if (validationPass) {
                                                    validationPass = validationPass.replace("[", "");
                                                    validationPass = validationPass.replace("]", "");
                                                    var listPass = validationPass.split(",");
                                                    for (var l = 0; l < listPass.length; l++) {
                                                        if (listPass[l].trim() == 'PASSWORD') {
                                                            if ((<HTMLInputElement>passControl).value == textValue) {
                                                                isMatch = true;
                                                                break passwordLoop;
                                                            }

                                                        }
                                                    }
                                                }
                                            }
                                        }

                                        if (isMatch == false) {
                                            var div = this.errorMessage(messageList[n]);
                                            if (formControl.parentNode != null) {
                                                formControl.parentNode.insertBefore(div, formControl.nextSibling);
                                            }
                                            isValue = false;
                                            break validationKeys;
                                        }
                                    }

                                    if (list[j].trim() == 'CONFIRM_EMAIL') {
                                        var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
                                        if (reg.test(textValue) == false) {
                                            var div = this.errorMessage(messageList[n]);
                                            if (formControl.parentNode != null) {
                                                formControl.parentNode.insertBefore(div, formControl.nextSibling);
                                            }
                                            isValue = false;
                                            break validationKeys;
                                        }

                                        var isMatch = false;
                                        if (textValue) {
                                            passwordLoop:
                                            for (var k = 0; k < childNodes.length; k++) {
                                                var passControl = childNodes[k];
                                                var validationEmail = passControl.getAttribute('spx-validation');
                                                if (validationEmail) {
                                                    validationEmail = validationEmail.replace("[", "");
                                                    validationEmail = validationEmail.replace("]", "");
                                                    var listPass = validationEmail.split(",");
                                                    for (var l = 0; l < listPass.length; l++) {
                                                        if (listPass[l].trim() == 'EMAIL') {
                                                            if ((<HTMLInputElement>passControl).value == textValue) {
                                                                isMatch = true;
                                                                break passwordLoop;
                                                            }

                                                        }
                                                    }
                                                }
                                            }
                                        }
                                        // if (list[j].trim() == 'PHONE_NUMBER_VALID') {
                                        //     var phoneRegEx = /^(?=.*[0-9])[- +()0-9]+$/;
                                        //     var sizeRegEX = /[0-9]{8,15}/;
                                        //     if (textValue.length > 0) {
                                        //         if (!textValue.match(sizeRegEX) || !textValue.match(phoneRegEx)) {
                                        //             var div = this.errorMessage(messageList[n]);
                                        //             formControl.parentNode.insertBefore(div, formControl.nextSibling);
                                        //             isValue = false;
                                        //             break validationKeys;
                                        //         }
                                        //     }
                                        // }
                                        if (isMatch == false) {
                                            var div = this.errorMessage(messageList[n]);
                                            if (formControl.parentNode != null) {
                                                formControl.parentNode.insertBefore(div, formControl.nextSibling);
                                            }
                                            isValue = false;
                                            break validationKeys;
                                        }
                                    }

                                }
                            }
                        }

                    }

                }
            }
        }

        return isValue;
    }

    errorMessage(message: string) {
        var div = document.createElement("div");
        div.classList.add('spx-div');
        var span = document.createElement("span");
        span.classList.add('spx-error');
        span.innerText = message;
        div.appendChild(span);
        return div;
    }

}