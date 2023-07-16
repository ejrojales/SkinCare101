function HandleOnDragEnd(result, sampleProducts, amProducts, pmProducts, updateProducts, updateAmProducts, updatePmProducts) {

    console.log(result)
    const hashmap = {
        "SampleCleanse": ["AmCleanse", "PmCleanse"],
        "SampleMoisturize": ["AmMoisturize", "PmMoisturize"],
        "SampleProtect": ["AmProtect", "PmProtect"]
    }

    // Return a routine product back to the sample products
    // 1st condition: routine product and null destination
    // 2nd condition: routine product and sample destination
    if ((!(result.source.droppableId in hashmap) && !result.destination) || ((!(result.source.droppableId in hashmap) && result.destination) && result.destination.droppableId in hashmap)) {

        let sample = Array.from(sampleProducts); // Create a copy array of sample products

        let routine = "pm";
        for (let y = 0; y < amProducts.length; y++) {
            if (amProducts[y].hasOwnProperty(result.source.droppableId)) {
                routine = "am"
            }
        }

        if (routine === "am") {
            let tempAmProducts = Array.from(amProducts); // Create a copy array of custom products
            for (let i = 0; i < tempAmProducts.length; i++) {
                if (tempAmProducts[i].hasOwnProperty(result.source.droppableId)) {
                    let index = tempAmProducts[i][result.source.droppableId].findIndex(product => product.id.toString() === result.draggableId)
                    const [reorderedItem] = tempAmProducts[i][result.source.droppableId].splice(index, 1) // Remove the item from the sample products

                    // Insert the item into the sample routine
                    for (let x = 0; x < sample.length; x++) {
                        if (sample[x].hasOwnProperty("Sample" + reorderedItem["step"])) {
                            sample[x]["Sample" + reorderedItem["step"]].push(reorderedItem);
                            break;
                        }
                    }
                    break;
                }
            }
            updateProducts(sample); // update the state of sample products
            updateAmProducts(tempAmProducts); // update the state of sample products
        }

        if (routine === "pm") {
            let tempPmProducts = Array.from(pmProducts); // Create a copy array of custom products
            for (let i = 0; i < tempPmProducts.length; i++) {
                if (tempPmProducts[i].hasOwnProperty(result.source.droppableId)) {
                    let index = tempPmProducts[i][result.source.droppableId].findIndex(product => product.id.toString() === result.draggableId)
                    const [reorderedItem] = tempPmProducts[i][result.source.droppableId].splice(index, 1) // Remove the item from the sample products

                    // Insert the item into the sample routine
                    for (let x = 0; x < sample.length; x++) {
                        if (sample[x].hasOwnProperty("Sample" + reorderedItem["step"])) {
                            sample[x]["Sample" + reorderedItem["step"]].push(reorderedItem);
                            break;
                        }
                    }
                    break;
                }
            }
            updateProducts(sample);
            updatePmProducts(tempPmProducts);
        }
    }

    if (!result.destination) return;

    // Movement from sample to am/pm routine
    if (hashmap.hasOwnProperty(result.source.droppableId) && hashmap[result.source.droppableId].includes(result.destination.droppableId)) {

        let sample = Array.from(sampleProducts); // Create a copy array of sample products

        let routine = "pm";
        for (let i = 0; i < amProducts.length; i++) {
            if (amProducts[i].hasOwnProperty(result.destination.droppableId)) {
                routine = "am"
            }
        }

        // Sample -> AM
        if (routine == "am") {
            let tempAmProducts = Array.from(amProducts); // Create a copy array of custom products
            for (let i = 0; i < sample.length; i++) {
                if (sample[i].hasOwnProperty(result.source.droppableId)) {
                    let index = sample[i][result.source.droppableId].findIndex(product => product.id.toString() === result.draggableId)
                    const [reorderedItem] = sample[i][result.source.droppableId].splice(index, 1) // Remove the item from the sample products

                    // Insert the item into the am routine
                    for (let x = 0; x < tempAmProducts.length; x++) {
                        if (tempAmProducts[x].hasOwnProperty(result.destination.droppableId)) {
                            tempAmProducts[x][result.destination.droppableId].push(reorderedItem);
                        }
                    }
                }
            }
            updateAmProducts(tempAmProducts); // update the state of sample products
        };

        // Sample -> PM
        if (routine === "pm") {
            let tempPmProducts = Array.from(pmProducts); // Create a copy array of custom products
            for (let i = 0; i < sample.length; i++) {
                if (sample[i].hasOwnProperty(result.source.droppableId)) {
                    let index = sample[i][result.source.droppableId].findIndex(product => product.id.toString() === result.draggableId)
                    const [reorderedItem] = sample[i][result.source.droppableId].splice(index, 1) // Remove the item from the sample products

                    // Insert the item into the pm routine
                    for (let x = 0; x < tempPmProducts.length; x++) {
                        if (tempPmProducts[x].hasOwnProperty(result.destination.droppableId)) {
                            tempPmProducts[x][result.destination.droppableId].push(reorderedItem);
                        }
                    }
                }
            }
            updatePmProducts(tempPmProducts);
        };
        updateProducts(sample);
    }

    // Movement between same routine
    if (result.source.droppableId === result.destination.droppableId) {

        let sample = Array.from(sampleProducts);

        // Movement between sample routine
        if (result.source.droppableId in hashmap) {
            for (let i = 0; i < sample.length; i++) {
                if (sample[i].hasOwnProperty(result.destination.droppableId)) {
                    let index = sample[i][result.destination.droppableId].findIndex(product => product.id.toString() === result.draggableId)
                    const [reorderedItem] = sample[i][result.destination.droppableId].splice(index, 1); // Remove the item from the sample products
                    sample[i][result.destination.droppableId].splice(result.destination.index, 0, reorderedItem); // Add the item to the reordered index
                }
            }
            updateProducts(sample);
        }

        let routine = "pm";
        for (let y = 0; y < amProducts.length; y++) {
            if (amProducts[y].hasOwnProperty(result.source.droppableId)) {
                routine = "am"
            }
        }

        if (routine === "am") {
            let tempAmProducts = Array.from(amProducts);

            for (let i = 0; i < tempAmProducts.length; i++) {
                if (tempAmProducts[i].hasOwnProperty(result.destination.droppableId)) {
                    let index = tempAmProducts[i][result.destination.droppableId].findIndex(product => product.id.toString() === result.draggableId)
                    const [reorderedItem] = tempAmProducts[i][result.destination.droppableId].splice(index, 1); // Remove the item from the custom products
                    tempAmProducts[i][result.destination.droppableId].splice(result.destination.index, 0, reorderedItem); // Add the item to the reordered index
                }
            }
            updateAmProducts(tempAmProducts);
        }

        if (routine === "pm") {
            let tempPmProducts = Array.from(pmProducts);

            for (let i = 0; i < tempPmProducts.length; i++) {
                if (tempPmProducts[i].hasOwnProperty(result.destination.droppableId)) {
                    let index = tempPmProducts[i][result.destination.droppableId].findIndex(product => product.id.toString() === result.draggableId)
                    const [reorderedItem] = tempPmProducts[i][result.destination.droppableId].splice(index, 1); // Remove the item from the custom products
                    tempPmProducts[i][result.destination.droppableId].splice(result.destination.index, 0, reorderedItem); // Add the item to the reordered index
                }
            }
            updatePmProducts(tempPmProducts);
        }
    } else if

        // Movement AM <-> PM 
        (!(result.source.droppableId in hashmap)) {
        let matchingStep = false;

        for (const prop in hashmap) {
            if ((hashmap[prop].includes(result.source.droppableId)) && hashmap[prop].includes(result.destination.droppableId)) {
                matchingStep = true;
            }
        }

        if (matchingStep === true) {

            // Determine if source product is am or pm
            let sourceProduct = "pm";
            for (let y = 0; y < amProducts.length; y++) {
                if (amProducts[y].hasOwnProperty(result.source.droppableId)) {
                    sourceProduct = "am"
                }
            }

            // AM -> PM
            if (sourceProduct === "am") {
                let tempAmProducts = Array.from(amProducts);
                let tempPmProducts = Array.from(pmProducts);

                for (let i = 0; i < tempAmProducts.length; i++) {
                    if (tempAmProducts[i].hasOwnProperty(result.source.droppableId)) {
                        let index = tempAmProducts[i][result.source.droppableId].findIndex(product => product.id.toString() === result.draggableId)
                        const [reorderedItem] = tempAmProducts[i][result.source.droppableId].splice(index, 1) // Remove the item from the am products

                        // Insert the item into the pm routine
                        for (let x = 0; x < tempPmProducts.length; x++) {
                            if (tempPmProducts[x].hasOwnProperty(result.destination.droppableId)) {
                                tempPmProducts[x][result.destination.droppableId].push(reorderedItem);
                            }
                        }
                    }
                }
                updateAmProducts(tempAmProducts);
                updatePmProducts(tempPmProducts);
            }

            // PM -> AM
            if (sourceProduct === "pm") {
                let tempAmProducts = Array.from(amProducts);
                let tempPmProducts = Array.from(pmProducts);

                for (let i = 0; i < tempPmProducts.length; i++) {
                    if (tempPmProducts[i].hasOwnProperty(result.source.droppableId)) {
                        let index = tempPmProducts[i][result.source.droppableId].findIndex(product => product.id.toString() === result.draggableId)
                        const [reorderedItem] = tempPmProducts[i][result.source.droppableId].splice(index, 1) // Remove the item from the pm products

                        // Insert the item into the am routine
                        for (let x = 0; x < tempAmProducts.length; x++) {
                            if (tempAmProducts[x].hasOwnProperty(result.destination.droppableId)) {
                                tempAmProducts[x][result.destination.droppableId].push(reorderedItem);
                            }
                        }
                    }
                }
                updateAmProducts(tempAmProducts);
                updatePmProducts(tempPmProducts);
            }
        }
    }

}

export default HandleOnDragEnd;