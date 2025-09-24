const express = require('express');
const router = express.Router();
const jobDescriptionModel = require('../../model/jobDescription');

router.get('/', function (req, res) {
    try {
        const sirenOrg = req.session.idOrganization;
        jobDescriptionModel.readallInOrganisation(sirenOrg, function (results) {
            if (results) {
                console.log(
                    "Lecture des fiches de poste de l'organisation " +
                        sirenOrg +
                        " REUSSIE par l'utilisateur " +
                        req.session.idUser +
                        '. - (GET /recruteur/gestionFichesDePoste)'
                );

                res.render('../views/recruteur/gestionFichesDePoste', {
                    title:
                        "MT Rec - Liste des fiches de poste de l'organisation " +
                        sirenOrg,
                    fichesDePoste: results,
                    message: 'Fiches de poste trouvees'
                });
            } else {
                console.log(
                    "Lecture des fiches de poste de l'organisation " +
                        sirenOrg +
                        " ECHOUEE par l'utilisateur" +
                        req.session.idUser +
                        ': aucune fiche de poste trouvee. - (GET /recruteur/gestionFichesDePoste)'
                );

                res.render('../views/recruteur/gestionFichesDePoste', {
                    title:
                        "MT Rec - Liste des fiches de poste de l'organisation " +
                        sirenOrg,
                    fichesDePoste: [],
                    message: 'Aucune fiche de poste'
                });
            }
        });
    } catch (error) {
        console.log(
            "Erreur lors de la lecture des fiches de poste de l'organisation:" +
                error +
                '. - (GET /recruteur/gestionFichesDePoste)'
        );

        res.status(500).json({
            title: "MT Rec - Liste des fiches de poste de l'organisation ",
            fichesDePoste: [],
            error: 'Erreur lors de la lecture des fiches de poste',
            status: 'error'
        });
    }
});

router.get('/:sirenOrg', function (req, res) {
    const sirenOrg = req.params.sirenOrg;
    jobDescriptionModel.readallInOrganisation(sirenOrg, function (results) {
        if (results) {
            res.render('../views/recruteur/gestionFichesDePoste', {
                title:
                    "MT Rec - Liste des fiches de poste de l'organisation " +
                    sirenOrg,
                fichesDePoste: results,
                message: 'Fiches de poste trouvees'
            });
        } else {
            res.render('../views/recruteur/gestionFichesDePoste', {
                title:
                    "MT Rec - Liste des fiches de poste de l'organisation " +
                    sirenOrg,
                fichesDePoste: [],
                message: 'Aucune fiche de poste'
            });
        }
    });
});

router.post('/ficheDePoste', function (req, res) {
    try {
        const idJobDescription = req.body.idJobDescription;
        // const jobTitle = req.body.jobTitle;
        // const idOrganization = req.body.idOrganization;

        // const idJobDescription = req.query.idJobDescription;
        // const jobTitle = req.query.jobTitle;
        // const idOrganization = req.query.idOrganization;

        jobDescriptionModel.readUsingId(idJobDescription, function (result) {
            if (result) {
                console.log(
                    'Lecture de la fiche de poste (idJobDescription= ' +
                        idJobDescription +
                        ") pour modification REUSSIE par l'utilisateur" +
                        req.session.idUser +
                        '. - (GET /recruteur/gestionFichesDePoste//ficheDePoste/:idJobDescription/jobTitle=?&idOrganization=?)'
                );

                res.status(200).json({
                    ficheDePoste: result,
                    message: 'Fiche de poste trouvee',
                    status: 'success'
                });
            } else {
                console.log(
                    'Lecture de la fiche de poste (idJobDescription= ' +
                        idJobDescription +
                        ") pour modification ECHOUEE par l'utilisateur" +
                        req.session.idUser +
                        ': fiche de poste non trouvee. - (GET /recruteur/gestionFichesDePoste//ficheDePoste/:idJobDescription/jobTitle=?&idOrganization=?)'
                );

                res.status(404).json({
                    ficheDePoste: [],
                    message: 'Fiche de poste non trouvee',
                    status: 'error'
                });
            }
        });
    } catch (error) {
        console.log(
            'Lecture de la fiche de poste: ' +
                error +
                '. - (GET /recruteur/gestionFichesDePoste//ficheDePoste/:idJobDescription/jobTitle=?&idOrganization=?)'
        );

        res.status(500).json({
            title: "MT Rec - Liste des fiches de poste de l'organisation ",
            ficheDePoste: [],
            error: 'Erreur survenue lors de la lecture de la fiche de poste',
            status: 'error'
        });
    }
});

router.put('/', function (req, res) {
    const jobTitle = req.body.jobTitle;
    const idOrganization = req.body.idOrganization;
    const statut_poste = req.body.statut_poste;
    const resp_hierarch = req.body.resp_hierarch;
    const jobType = req.body.jobType;
    const jobLocation = req.body.jobLocation;
    const rythme = req.body.rythme;
    const salary = req.body.rythme;
    const description = req.body.description;

    jobDescriptionModel.update(
        jobTitle,
        idOrganization,
        statut_poste,
        resp_hierarch,
        jobType,
        jobLocation,
        rythme,
        salary,
        description,
        function (success) {
            if (success) {
                res.json({
                    message: 'ficheDePoste modifiee avec succes',
                    redirect: '/recruteur/listeFichesDePoste'
                });
            } else {
                res.status(500).json({
                    message: 'Erreur lors de la modification de la ficheDePoste'
                });
            }
        }
    );
});

router.put('/updateFicheDePoste', function (req, res) {
    try {
        const idJobDescription = req.body.idJobDescription;
        const jobTitle = req.body.jobTitle;
        const idOrganization = req.body.idOrganization;
        const statut_poste = req.body.statut_poste;
        const resp_hierarch = req.body.resp_hierarch;
        const jobType = req.body.jobType;
        const jobLocation = req.body.jobLocation;
        const rythme = req.body.rythme;
        const salary = req.body.salary;
        const description = req.body.description;

        jobDescriptionModel.updateUsingId(
            idJobDescription,
            jobTitle,
            idOrganization,
            statut_poste,
            resp_hierarch,
            jobType,
            jobLocation,
            rythme,
            salary,
            description,
            function (success) {
                if (success) {
                    console.log(
                        'fiche de poste (idJobDescription= ' +
                            idJobDescription +
                            ') mise a jour avec succes. (PUT /recruteur/gestionFichesDePoste/updateFicheDePoste'
                    );

                    res.status(200).json({
                        message: 'Fiche de poste modifiee avec succes',
                        status: 'success'
                    });
                } else {
                    console.log(
                        'Echec de la mise a jour de fiche de poste (idJobDescription= ' +
                            idJobDescription +
                            ') : fiche de poste non trouvee. (PUT /recruteur/gestionFichesDePoste/updateFicheDePoste'
                    );

                    res.status(404).json({
                        error: 'Erreur lors de la modification de la ficheDePoste',
                        status: 'error'
                    });
                }
            }
        );
    } catch (error) {
        console.log(
            'Erreur lors de la mise a jour de fiche de poste: ' +
                error +
                '. (PUT /recruteur/gestionFichesDePoste/updateFicheDePoste'
        );

        res.status(500).json({
            error: 'Erreur lors de la modification de la ficheDePoste',
            status: 'error'
        });
    }
});

router.put('/:idJobDescription', function (req, res) {
    try {
        const idJobDescription = req.params.idJobDescription;
        const jobTitle = req.body.jobTitle;
        const idOrganization = req.body.idOrganization;
        const statut_poste = req.body.statut_poste;
        const resp_hierarch = req.body.resp_hierarch;
        const jobType = req.body.jobType;
        const jobLocation = req.body.jobLocation;
        const rythme = req.body.rythme;
        const salary = req.body.rythme;
        const description = req.body.description;

        jobDescriptionModel.update(
            jobTitle,
            idOrganization,
            statut_poste,
            resp_hierarch,
            jobType,
            jobLocation,
            rythme,
            salary,
            description,
            function (success) {
                if (success) {
                    console.log(
                        'fiche de poste (' +
                            idJobDescription +
                            ') mise a jour avec succes. - (PUT /recruteur/gestionFichesDePoste/:idJobDescription)'
                    );

                    res.status(200).json({
                        message: 'ficheDePoste supprimee avec succes',
                        status: 'success'
                    });
                } else {
                    console.log(
                        'Echec de la mise a jour de fiche de poste (' +
                            idJobDescription +
                            ') : fiche de poste non trouvee. - (PUT /recruteur/gestionFichesDePoste/:idJobDescription)'
                    );

                    res.status(500).json({
                        error: 'Erreur lors de la mise a jour de la ficheDePoste: fiche de poste non trouvee',
                        status: 'error'
                    });
                }
            }
        );
    } catch (error) {
        console.log(
            'Erreur survenue lors de la mise a jour de fiche de poste: ' +
                error +
                '. - (PUT /recruteur/gestionFichesDePoste/:idJobDescription)'
        );

        res.status(500).json({
            error: 'Erreur survenue lors de la mise a jour de la ficheDePoste',
            status: 'error'
        });
    }
});

router.delete('/', function (req, res) {
    const jobTitle = req.body.jobTitle;
    const idOrganization = req.body.idOrganization;

    jobDescriptionModel.delete(jobTitle, idOrganization, function (success) {
        if (success) {
            res.json({
                message: 'ficheDePoste supprimee avec succes',
                redirect: '/recruteur/listeFichesDePoste/'
            });
        } else {
            res.status(500).json({
                message: 'Erreur lors de la suppression de la ficheDePoste'
            });
        }
    });
});

router.delete('/:idJobDescription', function (req, res) {
    try {
        const idJobDescription = req.params.idJobDescription;
        const jobTitle = req.body.jobTitle;
        const idOrganization = req.body.idOrganization;

        jobDescriptionModel.delete(
            jobTitle,
            idOrganization,
            function (success) {
                if (success) {
                    console.log(
                        'fiche de poste (' +
                            idJobDescription +
                            ') supprimee avec succes. - (DELETE /recruteur/gestionFichesDePoste/:idJobDescription)'
                    );

                    res.status(200).json({
                        message: 'ficheDePoste supprimee avec succes',
                        status: 'success'
                    });
                } else {
                    console.log(
                        'Echec de la suppression de fiche de poste (' +
                            idJobDescription +
                            ') : fiche de poste non trouvee. - (DELETE /recruteur/gestionFichesDePoste/:idJobDescription)'
                    );

                    res.status(500).json({
                        error: 'Erreur lors de la suppression de la ficheDePoste: fiche de poste non trouvee',
                        status: 'error'
                    });
                }
            }
        );
    } catch (error) {
        console.log(
            'Erreur survenue lors de la suppression de fiche de poste: ' +
                error +
                '. - (DELETE /recruteur/gestionFichesDePoste/:idJobDescription)'
        );

        res.status(500).json({
            error: 'Erreur survenue lors de la suppression de la ficheDePoste',
            status: 'error'
        });
    }
});

module.exports = router;
