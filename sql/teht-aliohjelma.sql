/*MALLIMALLIMALLI
-- DELIMITER $$
CREATE PROCEDURE sp_get_henkilon_tiedot(
in henkilo_id int
)
BEGIN
SELECT nimi, puhelin FROM henkilot where id = henkilo_id;
END $$
GRANT EXECUTE ON PROCEDURE sp_get_henkilon_tiedot TO 'teivavi'@'localhost' identified
by 'incorrect!';
*/


-- the name is passed with IN and the number is returned using OUT
DELIMITER $$
CREATE PROCEDURE sp_get_henkilon_puhelinnumero(
    IN haettuNimi varchar(50), OUT puhelinNro varchar(50))
BEGIN
         SELECT puhelin INTO puhelinNro FROM henkilot
         WHERE nimi = haettuNimi;
END $$
GRANT EXECUTE ON PROCEDURE sp_get_henkilon_puhelinnumero TO 'teivavi'@'localhost' identified
by 'incorrect!';


SELECT puhelin FROM puhelinluettelo WHERE nimi = nimi;