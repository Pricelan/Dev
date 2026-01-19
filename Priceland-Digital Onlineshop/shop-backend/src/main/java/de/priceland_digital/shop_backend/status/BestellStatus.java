package de.priceland_digital.shop_backend.status;

public enum BestellStatus {

    IN_BEARBEITUNG {
        @Override
        public BestellStatus next() {
            return BEZAHLT;
        }
    },
    BEZAHLT {
        @Override
        public BestellStatus next() {
            return VERSANDT;
        }
    },
    VERSANDT {
        @Override
        public BestellStatus next() {
            return ABGESCHLOSSEN;
        }
    },
    ABGESCHLOSSEN {
        @Override
        public BestellStatus next() {
            return null;
        }
    };

    public abstract BestellStatus next();
}
