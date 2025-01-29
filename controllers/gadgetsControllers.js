const { uniqueNamesGenerator, adjectives, colors, animals } = require('unique-names-generator');
const { PrismaClient } = require('@prisma/client');
const { generateSelfDestructCode } = require('../utils/codes');

const prisma = new PrismaClient();


// Handler for retrieving all gadgets
exports.getGadgets = async (req, res) => {
    let status = req.query.status;
    try {
        if (status) {
            status = status.trim();
            status = status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();  // capitalize the first alphabet if

            // Check if status is valid
            const validStatuses = ['Available', 'Deployed', 'Destroyed', 'Decommissioned'];
            if (!validStatuses.includes(status)) {
                return res.status(400).json({
                    status: 'failed',
                    message: 'Status is not valid. Allowed values: Available, Deployed, Destroyed, Decommissioned.'
                });
            }
        }

        const gadgets = await prisma.gadgets.findMany({
            select: {  // selecting the required attributes, excluding statusTimeStamp
                id: true,
                name: true,
                status: true
            },
            where: status ? { status } : {} // if status is provided, if yes then filter gadgets
        });

        // adding a random mission success probability to each gadget
        const finalGadgets = gadgets.map(gadget => ({
            ...gadget,
            missionSuccessProbability: Math.floor(Math.random() * 101)
        }));
        
        res.status(200).json({
            status: 'success',
            length: finalGadgets.length, 
            data: finalGadgets
        });
    } catch (err) {
        res.status(500).json({
            status: 'failed',
            error: err.message
        });
    }
};


// Handler for creating new gadget
exports.addGadget = async (req, res) => {
    try {
        // Generating random name using unique-names-generator
        const gadgetName = uniqueNamesGenerator({
            dictionaries: [adjectives, colors, animals],
            separator: ' ',
            length: 2,
            style: 'capital'
        });

        const newGadget = await prisma.gadgets.create({
            data: {
                // id is auto generated using uuid
                name: gadgetName
                // status is by default Available for every new gadget
                // statusTimeStamp is auto generated
            }
        });
        console.log(newGadget);

        res.status(200).json({
            status: 'success',
            data: newGadget
        });
    } catch (err) {
        res.status(500).json({
            status: 'failed',
            error: err.message
        });
    }
};


// Handler for updating a gadget
exports.updateGadget = async (req, res) => {
    const id = req.params.id;
    let { name, status } = req.body; // only name and status can be updated

    try {
        // Check if id is valid
        if (!id) {
            return res.status(400).json({
                status: 'failed',
                message: 'Please provide a valid id to update'
            });
        }

        // Check if gadget with the given id exists
        const gadget = await prisma.gadgets.findUnique({
            where: { id }
        });

        if (!gadget) {
            return res.status(404).json({
                status: 'failed',
                message: 'Gadget not found'
            });
        }

        // If no name or status is provided, take existing values
        name = name ? name.trim() : gadget.name;

        if (status) {
            status = status.trim();
            status = status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();  // only capitalize the first alphabet
        } else {
            status = gadget.status;
        }


        // Check if new name already exists
        if (name !== gadget.name) {
            const existingGadget = await prisma.gadgets.findUnique({
                where: { name }
            });

            if (existingGadget) {
                return res.status(400).json({
                    status: 'failed',
                    message: 'The gadget name is already taken. Please choose a unique name.'
                });
            }
        }

        // Check if status is valid
        const validStatuses = ['Available', 'Deployed', 'Destroyed', 'Decommissioned'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({
                status: 'failed',
                message: 'Status is not valid. Allowed values: Available, Deployed, Destroyed, Decommissioned.'
            });
        }

        // Update the gadget
        const updatedGadget = await prisma.gadgets.update({
            where: { id },
            data: {
                name,
                status,
                statusTimeStamp: new Date()
            }
        });

        res.status(200).json({
            status: 'success',
            data: updatedGadget
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            status: 'failed',
            error: err.message
        });
    }
};


// Handler for decommissioning/deleting a gadget
exports.decommissionGadget = async (req, res) => {
    const id = req.params.id;

    try {
        // Check if id is valid
        if (!id) {
            return res.status(400).json({
                status: 'failed',
                message: 'Please provide a valid id to update'
            });
        }

        // Check if the gadget with the given id exists
        const gadget = await prisma.gadgets.findUnique({
            where: { id }
        });

        if (!gadget) {
            return res.status(404).json({
                status: 'failed',
                message: 'Gadget not found'
            });
        }

        // Update the gadget status to 'Decommissioned'
        const decommissionedGadget = await prisma.gadgets.update({
            where: { id },
            data: {
                status: 'Decommissioned',
                statusTimeStamp: new Date()  // decommission timestamp
            }
        });

        res.status(200).json({
            status: 'success',
            data: decommissionedGadget
        });
    } catch (err) {
        res.status(500).json({
            status: 'failed',
            error: err.message
        });
    }
};



// Handler for self destructing a gadget
exports.selfDestruct = async (req, res) => {
    const id = req.params.id;
    try {
        // Check if id is valid
        if (!id) {
            return res.status(400).json({
                status: 'failed',
                message: 'Please provide a valid id to update'
            });
        }

        // Check if the gadget with the given id exists
        const gadget = await prisma.gadgets.findUnique({
            where: { id }
        });

        if (!gadget) {
            return res.status(404).json({
                status: 'failed',
                message: 'Gadget not found'
            });
        }

        // generating a random code of length 8
        const selfDestructCode = await generateSelfDestructCode(8)

        res.status(200).json({
            status: 'success',
            message: 'Self-Destruct began',
            code: selfDestructCode
        });
    } catch (err) {
        res.status(500).json({
            status: 'failed',
            error: err.message
        });
    }
};