export function traverseAndCheck(element, condition) {
    if (condition(element)) return true;
    return Array.from(element.children).some(child => traverseAndCheck(child, condition));
}


// export function getAdjacentCellDiv(element, direction) {
//     let currentElement = element.closest('div[data-testid="cellInnerDiv"]');
//     while (currentElement) {
//         currentElement = direction === 'next' ? currentElement.nextElementSibling : currentElement.previousElementSibling;
//         if (!currentElement) break;
//         if (currentElement && currentElement.getAttribute('data-testid') === 'cellInnerDiv') {
//             return currentElement;
//         }
//     }
//     return null;
// }

export function getAdjacentCellDiv(element, direction) {
    const sibling = direction === 'next' ? 'nextElementSibling' : 'previousElementSibling';
    let current = element.closest('div[data-testid="cellInnerDiv"]');
    while (current = current[sibling]) {
        if (current.getAttribute('data-testid') === 'cellInnerDiv') return current;
    }
    return null;
}



export function checkAppliedStyle(element, properties) {
    let foundProperties = new Set();

    for (let sheet of document.styleSheets) {
        for (let rule of sheet.cssRules) {
            if (element.matches(rule.selectorText)) {
                for (let [prop, value] of properties) {
                    if (rule.style[prop] === value) {
                        foundProperties.add(prop);
                    }
                }
            }
        }
    }

    return foundProperties.size === properties.length;
}