import React, { useState, useEffect } from 'react';
import { Button, Modal, Grid } from '@mui/material';
import { BsPlus, BsDownload } from 'react-icons/bs';
import NewClientForm from '../../app/admin/companies/companies-components/NewClientForm';
import CompaniesList from '../../app/admin/companies/companies-components/CompaniesList';
import { _getAll } from '@/utils/apiUtils'; 

function DashboardBody() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedClient, setSelectedClient] = useState(null);
    const [clientListData, setClientListData] = useState([]);

    useEffect(() => {
        updateClientList(); 
    }, []);

    const handleOpenModal = (client) => {
        setSelectedClient(client);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setSelectedClient(null);
        setIsModalOpen(false);
    };

    const updateClientList = async () => {
        try {
            const data = await _getAll('/client');
            setClientListData(data);
        } catch (error) {
            console.error('Failed to fetch client data. Please try again later.', error);
        }
    };

    return (
        <>
            <div style={{ display: 'flex', justifyContent: "space-between" }}>
                <div style={{ margin: "10px" }}>
                    {/* Placeholder for additional buttons or elements */}
                </div>

                <div style={{ display: 'flex' }}>
                    <div style={{ margin: "10px" }}>
                        <Button
                            variant="contained"
                            startIcon={<BsDownload style={{ fontSize: '1.2em' }} />}
                        >
                            Download as Excel
                        </Button>
                    </div>
                    <div style={{ margin: "10px" }}>
                        <Button
                            variant="contained"
                            startIcon={<BsPlus style={{ fontSize: '1.2em' }} />}
                            onClick={() => handleOpenModal(null)}
                        >
                            New Company
                        </Button>
                    </div>
                </div>
            </div>
            <CompaniesList 
                clientListData={clientListData}
                onEdit={handleOpenModal} 
                onAdd={handleOpenModal} 
                updateClientList={updateClientList} 
            />
            <Modal
                open={isModalOpen}
                onClose={handleCloseModal}
            >
                <Grid >
                    <Grid >
                        <NewClientForm client={selectedClient} onClose={handleCloseModal} updateClientList={updateClientList} />
                    </Grid>
                </Grid>
            </Modal>
        </>
    );
}

export default DashboardBody;
