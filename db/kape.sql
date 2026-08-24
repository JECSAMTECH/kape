-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`Contacto`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Contacto` (
  `id_contacto` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NULL,
  `correo` VARCHAR(45) NOT NULL,
  `telefono` VARCHAR(15) NULL,
  `asunto` VARCHAR(200) NOT NULL,
  `mensaje` VARCHAR(500) NULL,
  PRIMARY KEY (`id_contacto`, `asunto`, `correo`),
  UNIQUE INDEX `id_contacto_UNIQUE` (`id_contacto` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`admin`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`admin` (
  `id_admin` INT NOT NULL,
  `Contacto_id_contacto` INT NOT NULL,
  `Contacto_asunto` VARCHAR(200) NOT NULL,
  `Contacto_correo` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id_admin`),
  INDEX `fk_admin_Contacto1_idx` (`Contacto_id_contacto` ASC, `Contacto_asunto` ASC, `Contacto_correo` ASC) VISIBLE,
  CONSTRAINT `fk_admin_Contacto1`
    FOREIGN KEY (`Contacto_id_contacto` , `Contacto_asunto` , `Contacto_correo`)
    REFERENCES `mydb`.`Contacto` (`id_contacto` , `asunto` , `correo`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Usuario` (
  `id_usuario` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(50) NOT NULL,
  `correo` VARCHAR(50) NOT NULL,
  `contraseña` VARCHAR(250) NOT NULL,
  `fecha_registro` DATETIME NOT NULL,
  `admin_id_admin` INT NOT NULL,
  PRIMARY KEY (`id_usuario`),
  UNIQUE INDEX `id_cliente_UNIQUE` (`id_usuario` ASC) VISIBLE,
  INDEX `fk_Usuario_admin1_idx` (`admin_id_admin` ASC) VISIBLE,
  CONSTRAINT `fk_Usuario_admin1`
    FOREIGN KEY (`admin_id_admin`)
    REFERENCES `mydb`.`admin` (`id_admin`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Proveedor`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Proveedor` (
  `id_proveedor` INT NOT NULL AUTO_INCREMENT,
  `telefono` VARCHAR(45) NOT NULL,
  `id_usuario` INT NOT NULL,
  PRIMARY KEY (`id_proveedor`),
  UNIQUE INDEX `id_proveedor_UNIQUE` (`id_proveedor` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`producto`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`producto` (
  `id_producto` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  `descripcion` VARCHAR(125) NOT NULL,
  `imagen` VARCHAR(2048) NOT NULL,
  `precio` DECIMAL(2) NOT NULL,
  `stock` INT NOT NULL,
  PRIMARY KEY (`id_producto`),
  UNIQUE INDEX `id_inventario_UNIQUE` (`id_producto` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Producto_cafe`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Producto_cafe` (
  `id_cafe` INT NOT NULL AUTO_INCREMENT,
  `etiquetas` VARCHAR(45) NOT NULL,
  `tueste` VARCHAR(45) NOT NULL,
  `notas_de_cata` VARCHAR(125) NOT NULL,
  `intensidad` INT NOT NULL,
  `id_producto` INT NOT NULL,
  `producto_id_producto` INT NOT NULL,
  PRIMARY KEY (`id_cafe`),
  UNIQUE INDEX `id_cafe_UNIQUE` (`id_cafe` ASC) VISIBLE,
  INDEX `fk_Producto_cafe_producto1_idx` (`producto_id_producto` ASC) VISIBLE,
  CONSTRAINT `fk_Producto_cafe_producto1`
    FOREIGN KEY (`producto_id_producto`)
    REFERENCES `mydb`.`producto` (`id_producto`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Resenia`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Resenia` (
  `id_reseñas` INT NOT NULL AUTO_INCREMENT,
  `id_cliente` INT NOT NULL,
  `id_producto` INT NOT NULL,
  `calificacion` INT NOT NULL,
  `comentario` VARCHAR(200) NULL,
  `fecha` DATETIME NOT NULL,
  PRIMARY KEY (`id_reseñas`),
  UNIQUE INDEX `id_reseñas_UNIQUE` (`id_reseñas` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Producto_varios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Producto_varios` (
  `id_producto_varios` INT NOT NULL AUTO_INCREMENT,
  `id_producto` INT NOT NULL,
  `nombre` VARCHAR(45) NOT NULL,
  `descripcion` VARCHAR(120) NOT NULL,
  `producto_id_producto` INT NOT NULL,
  PRIMARY KEY (`id_producto_varios`),
  UNIQUE INDEX `id_producto_UNIQUE` (`id_producto_varios` ASC) VISIBLE,
  INDEX `fk_Producto_varios_producto1_idx` (`producto_id_producto` ASC) VISIBLE,
  CONSTRAINT `fk_Producto_varios_producto1`
    FOREIGN KEY (`producto_id_producto`)
    REFERENCES `mydb`.`producto` (`id_producto`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Pedido`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Pedido` (
  `id_pedido` INT NOT NULL AUTO_INCREMENT,
  `id_usuario` INT NOT NULL,
  `id_datos_envio` INT NOT NULL,
  `fecha` DATETIME NOT NULL,
  `total` DECIMAL(2) NOT NULL,
  `estatus` ENUM('pendiente', 'en tránsito', 'entregado', 'rechazado') NOT NULL DEFAULT 'pendiente',
  `Resenia_id_reseñas` INT NOT NULL,
  PRIMARY KEY (`id_pedido`, `Resenia_id_reseñas`),
  UNIQUE INDEX `id_pedido_UNIQUE` (`id_pedido` ASC) VISIBLE,
  INDEX `fk_Pedido_Resenia1_idx` (`Resenia_id_reseñas` ASC) VISIBLE,
  CONSTRAINT `fk_Pedido_Resenia1`
    FOREIGN KEY (`Resenia_id_reseñas`)
    REFERENCES `mydb`.`Resenia` (`id_reseñas`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Datos_envío`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Datos_envío` (
  `id_datos_envío` INT NOT NULL AUTO_INCREMENT,
  `num_telefono` VARCHAR(15) NULL,
  `fecha_envio` DATETIME NULL,
  `estatus` ENUM('pendiente', 'en tránsito', 'entregado', 'rechazado') NULL DEFAULT 'pendiente',
  `Pedido_id_pedido` INT NOT NULL,
  `Pedido_Resenia_id_reseñas` INT NOT NULL,
  PRIMARY KEY (`id_datos_envío`),
  UNIQUE INDEX `id_datos_envío_UNIQUE` (`id_datos_envío` ASC) VISIBLE,
  UNIQUE INDEX `num_telefono_UNIQUE` (`num_telefono` ASC) VISIBLE,
  INDEX `fk_Datos_envío_Pedido1_idx` (`Pedido_id_pedido` ASC, `Pedido_Resenia_id_reseñas` ASC) VISIBLE,
  CONSTRAINT `fk_Datos_envío_Pedido1`
    FOREIGN KEY (`Pedido_id_pedido` , `Pedido_Resenia_id_reseñas`)
    REFERENCES `mydb`.`Pedido` (`id_pedido` , `Resenia_id_reseñas`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Direccion`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Direccion` (
  `id_direccion` INT NOT NULL AUTO_INCREMENT,
  `id_usuario` INT NOT NULL,
  `calle` VARCHAR(45) NOT NULL,
  `colonia` VARCHAR(45) NOT NULL,
  `numero` VARCHAR(15) NOT NULL,
  `ciudad` VARCHAR(45) NOT NULL,
  `estado` VARCHAR(45) NOT NULL,
  `pais` VARCHAR(45) NOT NULL,
  `codigo_postal` VARCHAR(15) NOT NULL,
  PRIMARY KEY (`id_direccion`),
  UNIQUE INDEX `id_direccion_UNIQUE` (`id_direccion` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`cliente`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`cliente` (
  `id_cliente` INT NOT NULL,
  `direccion_defaul` VARCHAR(45) NULL,
  `Pedido_id_pedido` INT NOT NULL,
  `Pedido_Resenia_id_reseñas` INT NOT NULL,
  `Usuario_id_usuario` INT NOT NULL,
  PRIMARY KEY (`id_cliente`, `Pedido_id_pedido`, `Pedido_Resenia_id_reseñas`),
  INDEX `fk_cliente_Pedido1_idx` (`Pedido_id_pedido` ASC, `Pedido_Resenia_id_reseñas` ASC) VISIBLE,
  INDEX `fk_cliente_Usuario1_idx` (`Usuario_id_usuario` ASC) VISIBLE,
  CONSTRAINT `fk_cliente_Pedido1`
    FOREIGN KEY (`Pedido_id_pedido` , `Pedido_Resenia_id_reseñas`)
    REFERENCES `mydb`.`Pedido` (`id_pedido` , `Resenia_id_reseñas`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_cliente_Usuario1`
    FOREIGN KEY (`Usuario_id_usuario`)
    REFERENCES `mydb`.`Usuario` (`id_usuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Direccion_has_cliente`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Direccion_has_cliente` (
  `Direccion_id_direccion` INT NOT NULL,
  `cliente_id_cliente` INT NOT NULL,
  PRIMARY KEY (`Direccion_id_direccion`, `cliente_id_cliente`),
  INDEX `fk_Direccion_has_cliente_cliente1_idx` (`cliente_id_cliente` ASC) VISIBLE,
  INDEX `fk_Direccion_has_cliente_Direccion1_idx` (`Direccion_id_direccion` ASC) VISIBLE,
  CONSTRAINT `fk_Direccion_has_cliente_Direccion1`
    FOREIGN KEY (`Direccion_id_direccion`)
    REFERENCES `mydb`.`Direccion` (`id_direccion`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Direccion_has_cliente_cliente1`
    FOREIGN KEY (`cliente_id_cliente`)
    REFERENCES `mydb`.`cliente` (`id_cliente`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Proveedor_has_producto`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Proveedor_has_producto` (
  `Proveedor_id_proveedor` INT NOT NULL,
  `producto_id_producto` INT NOT NULL,
  PRIMARY KEY (`Proveedor_id_proveedor`, `producto_id_producto`),
  INDEX `fk_Proveedor_has_producto_producto1_idx` (`producto_id_producto` ASC) VISIBLE,
  INDEX `fk_Proveedor_has_producto_Proveedor1_idx` (`Proveedor_id_proveedor` ASC) VISIBLE,
  CONSTRAINT `fk_Proveedor_has_producto_Proveedor1`
    FOREIGN KEY (`Proveedor_id_proveedor`)
    REFERENCES `mydb`.`Proveedor` (`id_proveedor`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Proveedor_has_producto_producto1`
    FOREIGN KEY (`producto_id_producto`)
    REFERENCES `mydb`.`producto` (`id_producto`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Pedido_has_producto`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Pedido_has_producto` (
  `Pedido_id_pedido` INT NOT NULL,
  `Pedido_Resenia_id_reseñas` INT NOT NULL,
  `producto_id_producto` INT NOT NULL,
  PRIMARY KEY (`Pedido_id_pedido`, `Pedido_Resenia_id_reseñas`, `producto_id_producto`),
  INDEX `fk_Pedido_has_producto_producto1_idx` (`producto_id_producto` ASC) VISIBLE,
  INDEX `fk_Pedido_has_producto_Pedido1_idx` (`Pedido_id_pedido` ASC, `Pedido_Resenia_id_reseñas` ASC) VISIBLE,
  CONSTRAINT `fk_Pedido_has_producto_Pedido1`
    FOREIGN KEY (`Pedido_id_pedido` , `Pedido_Resenia_id_reseñas`)
    REFERENCES `mydb`.`Pedido` (`id_pedido` , `Resenia_id_reseñas`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Pedido_has_producto_producto1`
    FOREIGN KEY (`producto_id_producto`)
    REFERENCES `mydb`.`producto` (`id_producto`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
